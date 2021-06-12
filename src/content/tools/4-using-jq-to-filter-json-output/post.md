Title: Using »jq« to filter JSON output

-----

Date: 1623512701

-----

Description: »jq« is a lightweight command-line JSON processor based on the concept of filters operating over a JSON stream. There are numerous predefined functions/filters that can easily be combined using pipes to quickly create and apply complex operations and transformations.

-----

Authors: rasshofer

-----

Text:

First of all, (github: stedolan/jq) offers [prebuilt binaries](https://stedolan.github.io/jq/download/) for nearly any platform, so download and install `jq` if you haven’t done so already. All of the following commands and filter demos are based on the following JSON document input as data.

```json
{
  "data": {
    "posts": [{
      "id": 1,
      "author": "Jane Doe",
      "title": "Lorem ipsum dolor sit amet",
      "summary": "Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.",
      "tags": ["lorem", "ipsum", "dolor"]
    }, {
      "id": 2,
      "author": "John Doe",
      "title": "Sed diam voluptua",
      "summary": "At vero eos et accusam et justo duo dolores et ea rebum.",
      "tags": ["sed", "diam", "voluptua"]
    }, {
      "id": 3,
      "author": "Jane Doe",
      "title": "Labore et dolore magna aliquyam erat",
      "summary": "Stet clita kasd gubergren, no sea takimata sanctus est.",
      "tags": ["lorem", "ipsum", "dolor"]
    }]
  },
  "error": false,
  "code": 200
}
```

To keep it realistic, the data is stored as minified JSON in the file, i.e. any kind of unnecessary whitespace has been removed, making it hard to grasp and a characteristic use case for `jq`.

```json
{"data":{"posts":[{"id":1,"author":"Jane Doe","title":"Lorem ipsum dolor sit amet","summary":"Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.","tags":["lorem","ipsum","dolor"]},{"id":2,"author":"John Doe","title":"Sed diam voluptua","summary":"At vero eos et accusam et justo duo dolores et ea rebum.","tags":["sed","diam","voluptua"]},{"id":3,"author":"Jane Doe","title":"Labore et dolore magna aliquyam erat","summary":"Stet clita kasd gubergren, no sea takimata sanctus est.","tags":["lorem","ipsum","dolor"]}]},"error":false,"code":200}
```

While it’s used from a static file (i.e. `cat data.json`) in the upcoming examples, the data could be returned e.g. from an API call via cURL (i.e. `curl https://example.com/data.json`) or as output of a preceding command accordingly.

## Prettify JSON

When working with data from APIs, these usually return minifed JSON (to reduce the transferred amount of data) as mentioned before. Passing any kind of JSON to `jq` without any additional configuration will prettify the JSON so it’s easier to read and understand.

```sh
cat data.json | jq
```

Actually, calling `jq` without any argument/path is a shortcut for the identity filter `jq '.'` which returns all its input. `.` here means the full document.

```sh
cat data.json | jq '.'
```

Now you can see and navigate through the formatted JSON output.

(image: identity-filter.png)

## Access properties

Based on aforementioned identity filter, you can access property values by using another simple filter, the `.property` operator. Use `.` to find a property value and simply combine this filter with the respective property path.

```sh
cat data.json | jq '.data'
```

You can also chain property values as known from e.g. JavaScript, allowing you to access nested objects.

```sh
cat data.json | jq '.data.posts'
```

(image: nested-objects.png)

If you need to retrieve multiple keys, you can separate them with a comma.

```sh
cat data.json | jq '.error,.code'
```

(If any of the properties contain spaces or special characters, you must enclose the property name in quotes like `jq '."some property name"'`.)

## Working with arrays

Now let's look at how you can work with arrays in JSON data. As with many programming languages, `jq` uses square brackets to indicate the beginning and end of an array. The following example shows how to iterate over an array.

```sh
cat data.json | jq '.data.posts[]'
```

(image: array.png)

In case the array is containing objects, you can extract properties from each object in the array by chaining commands.

```sh
cat data.json | jq '.data.posts[] | .title'
```

The command first iterates over the entire array with `.data.posts[]` and then, due to the pipe (`|`), passes each object in the array to the next filter in the command. In the last step, the `title` property of each object is extracted with the `.title` filter as seen before.

(image: array-properties.png)

As with all arrays, you can also directly access any of the elements in the array by passing in their index, allowing you to access the properties of an object in the array directly.

```sh
cat data.json | jq '.data.posts[1].title'
```

(image: array-path.png)

Using the square brackets notation, you can also select ranges and slice arrays. This is especially useful when you need to return a sub-array of an array.

```sh
cat data.json | jq '.data.posts[1:2]'
```

(image: array-range.png)

You can select one sided ranges.

```sh
cat data.json | jq '.data.posts[1:]'
```

(image: array-one-sided-range.png)

To select from the end, you can use negative ranges.

```sh
cat data.json | jq '.data.posts[-2:]'
```

(image: array-negative-range.png)

## Chaining calls

Using a regular shell pipe (`|`), you may want/need to chain `jq` calls which can be useful when needing to apply filters step by step, e.g. for debugging purposes. The following commands are doing the exact same thing.

```sh
cat data.json | jq '.data.posts[].title'
```

```sh
cat data.json | jq '.data.posts[]' | jq '.title'
```

(image: array-path-chain.png)

However, there’s an import different between the following commands.

```sh
cat data.json | jq '.data.posts[].title'
```

(image: array-path-chain-plain.png)

```sh
cat data.json | jq '[.data.posts[].title]'
```

(image: array-path-chain-array.png)

While both return the `title` field for each item, the first commands returns the values as a string list while the second command wraps the string list back to an array. For further processing, the latter may be the more useful as it allows to use the transformed array.

Using `jq`’s built-in `map` function, this can also be written in a more readable way.

```sh
cat data.json | jq '.data.posts | map(.title)'
```

## Functions / Filters

`jq` offers much more than simple filtering and has many powerful [built-in functions](https://stedolan.github.io/jq/manual/#Builtinoperatorsandfunctions) that let you perform a variety of useful operations on JSON data. Most of these functions tend to mirror JavaScript functions and might feel familiar. Even better, you can also implement your own functions, if you want/need to. Thus the following section only covers the most common cases.

### Array/object length

One of these handy functions for arrays and objects is the `length` function which can be used to return the length of an array or the number of properties of an object.

```sh
cat data.json | jq '.data.posts | length'
```

(image: length-array.png)

```sh
cat data.json | jq '.data.posts[1] | length'
```

(image: length-object.png)

### Sorting

Using `sort`, you can sort an array.

```sh
cat data.json | jq '.data.posts | map(.title) | sort'
```

(image: sorting.png)

### Reversing

Similar, using `reverse`, you can invert the order of an array.

```sh
cat data.json | jq '.data.posts | map(.title) | reverse'
```

(image: reversing.png)

### Minimum / Maximum

The `min` and `max` functions, on the other hand, let you quickly find the minimum or maximum element of an array.

```sh
cat data.json | jq '.data.posts | map(.id) | min'
```

(image: min.png)

```sh
cat data.json | jq '.data.posts | map(.id) | max'
```

(image: max.png)

### Unique

Using `unique`, you can generate an array with unique values of an array.

```sh
cat data.json | jq '.data.posts | map(.author) | unique'
```

(image: unique.png)

### Joining lists

Using `join`, you can join an array to a string using a custom delimiter.

```sh
cat data.json | jq '.data.posts | map(.id) | join("/")'
```

(image: joining.png)

### Regular expressions

The `test` function lets you check whether an input matches a particular regular expression. The following example returns the value of the `summary` property of all posts with a `title` that end with the letter `t`.

```sh
cat data.json | jq '.data.posts[] | select(.title | test(".*t$")) | .summary'
```

(image: regular-expression.png)

## Removing formatting (quotes, line breaks)

By default, `jq` returns JSON-ish results so they can be piped and processed by other commands or `jq` itself. In case you want to receive raw representations of values, the `-r` option in `jq` gives you raw strings.

```sh
cat data.json | jq -r '.data.posts[].title'
```

(image: raw.png)
