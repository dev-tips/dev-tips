Title: Find erroneous/broken commits with »git bisect«

-----

Date: 1598729048

-----

Description: You made a few changes to your codebase and occasionally slipped a small commit in between. After a few more, you run the unit/integration tests – and, lo and behold, an error/regression has sneaked in. Bisection to the rescue!

-----

Authors: rasshofer

-----

Text:

To find the origin of such an error/regression, essentially, all you have to do is going through the commits to find out, what commit broke the tests. However, this can be quite tedious, especially since this manual approach is slow and error-prone.

To remedy this, Git offers a built-in tool for debugging that can be found/used by running `git bisect`. It allows to define a set of commits that you suspect to have the problematic code in them and then use binary elimination methods to find the start/origin of the problem. In doing so, finding bugs becomes faster and easier.

Let’s have a look at a standalone and simplified example and run some test cases to see how it works. The example uses a plain text file for demonstrating what’s happening but you can transfer the knowledge and usage of bisection to any real-world project, e.g. a project where you’d run unit tests via `npm test` or similar – `cat test.txt` in the examples below basically is the same as running such tests.

## Setting up the test case/project

We’d like to generate a few commits to see/visualize how the binary search goes through all commits and how to run the test. For this, we set up a shell script that generates a file called `test.txt` and appends 15 lines to it and commits the changes respectively.

```sh
for i in $(seq 1 15)
do
  if [[ "$i" == "10" ]]
  then
    echo "Error ($i)" >> test.txt
  else
    echo "Test ($i)" >> test.txt
  fi
  git add test.txt
  git commit -m "Test $i"
done
```

Now, let’s have a look at the Git log for that created project.

```sh
git log --pretty=oneline
```

```txt
63483878135d078bdb4d4827c7c2c455866188ea (HEAD -> master) Test 15
7e75a97c340c442b789ab590018a88995208012b Test 14
ca4a5aa653561d9d1365293f0d5991b6fe60011f Test 13
1b4d22a315224e2563e78c2bcd74bf3cdfbe9cfa Test 12
7578c99655be1843a9c01bc3758bcb0c8c78f5ca Test 11
bccc1e38a3a9689f08114ffeb55f1c1f68f36a2e Test 10
7cd18946472adc298a297d0db950c751f5864099 Test 9
74c599d803ebf81f5fe5a64b016237903acd8ee8 Test 8
7ff94e0b29cbc7e883c5c24e3f0882c09cad2fc0 Test 7
e09f0f83c17ecbc7443395e58ba3aa39b8d52733 Test 6
9d8773035704274ad7ba3c78119a86a26a70a842 Test 5
47ac4c8e7700d5fa161c477cd6d5ab0afddce646 Test 4
a90df59cbe4de8f1ce615477dcac57ad52f63045 Test 3
41af031525cf22ec260dd64914f28080448cdf74 Test 2
0b313b8db77c69d4c3840630d127e8bfc1140594 Test 1
```

Next, we want Git to find what commit introduced the erroneous code, i.e. what commit added the line containing `Error` to the file/project. Again, while adding a line containing `Error` here is for demonstration purposes in this demo case, it’s basically equal to e.g. your unit tests starting to fail, i.e. `npm test` reporting errors/regressions, for example.

## Starting bisection

We start the bisection with the following command.

```sh
git bisect start
```

Now we need to let Git know what commit does not work anymore and what was the last one that still worked as expected. In our case, we’ll use the last commit as the one that doesn’t work anymore and the very first commit as the one that definitively worked. (In the real world, this last working commit may be the `main`/`master` branch for a pull/merge request or a release version tag like `v1.2.3`.)

```sh
git bisect bad
```

(In this case, `HEAD` is used as we didn’t specify a Git reference.)

```sh
git bisect good 0b313b8db77c69d4c3840630d127e8bfc1140594
```

(Alternatively, the short form `git bisect start {BAD_COMMIT} {GOOD_COMMIT}` can be used as well.)

```sh
git bisect start HEAD 0b313b8db77c69d4c3840630d127e8bfc1140594
```

Git now takes all commits between those two commits and slices the range in half in order to narrow down the possible options of commits which introduced the error/regression. In this case, it uses the 8th commit as reference and checks it out automatically.

```txt
Bisecting: 6 revisions left to test after this (roughly 3 steps)
[74c599d803ebf81f5fe5a64b016237903acd8ee8] Test 8
```

Now it’s up to us to verify whether things still work for this state. We’ll run `cat test.txt` (or something like `npm test`) to see whether the erroneous line is in there.

```txt
Test (1)
Test (2)
Test (3)
Test (4)
Test (5)
Test (6)
Test (7)
Test (8)
```

As we can see, there’s no line saying `Error` in the file. This means everything is still fine. So let’s inform Git, that up to that commit, things were fine.

```sh
git bisect good
```

Again, Git now takes all commits between commit `74c599d803ebf81f5fe5a64b016237903acd8ee8` and `HEAD` and slices this range in half in order to narrow down the possible options. Now, it uses the 11th commit as reference and checks it out automatically as well.

```txt
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[7578c99655be1843a9c01bc3758bcb0c8c78f5ca] Test 11
```

We’ll run `cat test.txt` (or something like `npm test`) again to see whether the erroneous line is in there.

```txt
Test (1)
Test (2)
Test (3)
Test (4)
Test (5)
Test (6)
Test (7)
Test (8)
Test (9)
Error (10)
Test (11)
```

Indeed, this state of the project includes the erroneous line. Thus, we inform Git that things are broken in that commit.

```sh
git bisect bad
```

The same procedure applies and Git slices down the range between the commits in order to narrow down the possible options. Now, it uses the 10th commit as reference and checks it out automatically.

```txt
Bisecting: 0 revisions left to test after this (roughly 1 step)
[bccc1e38a3a9689f08114ffeb55f1c1f68f36a2e] Test 10
```

We’ll run `cat test.txt` (or something like `npm test`) again to verify whether the erroneous line is already in there.

```txt
Test (1)
Test (2)
Test (3)
Test (4)
Test (5)
Test (6)
Test (7)
Test (8)
Test (9)
Error (10)
```

As a matter of fact, that’s the case. Thus, we inform Git again that things are broken in that commit.

```sh
git bisect bad
```

Git slices down the range once more checks out the 9th commit automatically.

```txt
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[7cd18946472adc298a297d0db950c751f5864099] Test 9
```

We’ll run `cat test.txt` (or something like `npm test`) again to verify whether the erroneous line is already in there.

```txt
Test (1)
Test (2)
Test (3)
Test (4)
Test (5)
Test (6)
Test (7)
Test (8)
Test (9)
```

Things look good for that commit and we can inform Git that things are fine in that commit.

```sh
git bisect good
```

Git now knows that it has to be the 10th commit (`bccc1e38a3a9689f08114ffeb55f1c1f68f36a2e`) that introduced the error/regression and reports the culprit as result.

```txt
bccc1e38a3a9689f08114ffeb55f1c1f68f36a2e is the first bad commit
```

We then use `git show bccc1e38a3a9689f08114ffeb55f1c1f68f36a2e` to check what changes have been made in this commit.

Finally, we can stop the bisection.

```sh
git bisect reset
```

Git will switch back to where we started.

```txt
Previous HEAD position was 7cd1894 Test 9
Switched to branch 'master'
```

## Fully automated bisecting

While we performed manual bisection for demonstration purposes, we can also automate this manual process using the command `git bisect run`. The script or command passed to that command is executed at each step of the bisection process and its exit code is interpreted as »good« if it’s `0` or »bad« otherwise.

We can use the following command to check if the file contains the text `Error`.

```sh
grep -q "Error" test.txt && echo "Found" || echo "Not found"
```

The exit status of `grep` will be `0` if the text was found and `1` if not. Thus, for our automated bisecting, we need to invert this as `0` means »good« and everything else means »bad« when using `git bisect run`. This means it’s »good« (i.e. exit code `0`) if the file doesn’t contain the text and »bad« (i.e. exit code `1`) if the file does contain the text.

We adapt this logic into a shell script called `check.sh` for testing purposes.

```sh
#!/bin/sh
grep -q "Error" test.txt && exit 1 || exit 0
```

Now, we let `git bisect run` execute that shell script for us.

```sh
git bisect run sh check.sh
```

Next, Git runs that command automatically for each suspected commit.

```txt
running sh check.sh
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[7578c99655be1843a9c01bc3758bcb0c8c78f5ca] Test 11
running sh check.sh
Bisecting: 0 revisions left to test after this (roughly 1 step)
[bccc1e38a3a9689f08114ffeb55f1c1f68f36a2e] Test 10
running sh check.sh
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[7cd18946472adc298a297d0db950c751f5864099] Test 9
running sh check.sh
bccc1e38a3a9689f08114ffeb55f1c1f68f36a2e is the first bad commit
```

Same result, but almost no manual efforts. Neat.

## Conclusion

As you can see from the simplified example, we can use `git bisect` to locate a problem faster. It’s a great tool to increase your productivity – instead of going through the whole history of commits, you can make debugging much more systematic.
