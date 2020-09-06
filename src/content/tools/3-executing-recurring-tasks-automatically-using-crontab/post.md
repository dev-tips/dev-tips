Title: Executing recurring tasks automatically using crontab

-----

Date: 1599398648

-----

Description: Doing recurring tasks like data backups or archiving log files by hand is both boring and unreliable. Such routine tasks are quickly forgotten and when a backup is needed, none is available.

-----

Authors: rasshofer

-----

Text:

Recurring tasks should be converted to cron jobs and handled by the cron daemon. It’s used for time-based execution of processes in UNIX systems. While setting up such cron jobs can be a bit confusing at first, this tip summarizes everything you need to know.

## crontab – the cron table

To configure cron jobs, you edit a specific text file, the `crontab` (i.e. »cron table«). The following command opens that table in your default text editor and allows you to add, edit, or remove cron jobs.

```sh
crontab -e
```

Please note that you can only edit the cron jobs of the current user. To edit cron jobs of another user on your system, you must specify the user explicitly.

```sh
crontab -e -u thomas
```

If you simply want a listing of all active cron jobs, run the following command.

```sh
crontab -l
```

Please note that you’ll only get a listing of the current user here as well. To list cron jobs of another user on your system, you must, again, specify the user explicitly.

```sh
crontab -l -u thomas
```

## Add/edit cron job

In general, cron jobs are entered in the following form.

```txt
* * * * * /execute/this/script.sh
```

## Scheduling of a cron job

As you can see from the aforementioned example, five asterisks (`*`) are specified, which are not there for fun, but define the execution time of the cron job – in this case: every minute. It becomes more understandable if you take a closer look at the fields for which an asterisk is specified in each case.

- Field 1 = minute (from 0 to 59)
- Field 2 = hour (from 0 to 23)
- Field 3 = day of the month (from 1 to 31)
- Field 4 = month (from 1 to 12)
- Field 5 = day of the week (from 0 to 6 where 0 = Sunday)

The five asterisks in the aforementioned example thus indicate that the cron job should run every minute of every hour of every day of every month of every day of the week. In short, the script will run every minute without exception.

Please note that the time is specified in 24-hour format.

Let’s take a look at a few more examples.

## Examples

### Example 1: Run cron job at specific time (e.g. 14:30)

```txt
30 14 * * * /home/thomas/script.sh
```

- Field 1 = minute = 30
- Field 2 = hour = 14
- Field 3 = every day
- Field 4 = every month
- Field 5 = every day of the week

Use case: cron job that congratulates people having birthday on that day via email every day.

### Example 2: Run cron job on specific date (e.g. January 1st)

```txt
0 0 1 1 * /home/thomas/script.sh
```

- Field 1 = minute = 0
- Field 2 = hour = 0
- Field 3 = day = 1
- Field 4 = month = 1
- Field 5 = every day of the week

Use case: cron job wishing all members of a community a happy new year via email.

### Example 3: Run cron job every Friday at 16:00

```txt
0 16 * * 5 /home/thomas/script.sh
```

- Field 1 = minute = 0
- Field 2 = hour = 16
- Field 3 = every day
- Field 4 = every month
- Field 5 = day of the week = 5 (Friday)

Use case: cron job that automatically rings in the weekend for all employees via email.

### Example 4: Run cron job every working day at 08:00

To specify an interval for a field (»from {START} to {END}«), you can simply indicate this with a hyphen (`-`).

```txt
0 8 * * 1-5 /home/thomas/script.sh
```

- Field 1 = minute = 0
- Field 2 = hour = 8
- Field 3 = every day
- Field 4 = every month
- Field 5 = day of the week = 1-5 (Monday to Friday)

Use case: cron job that automatically sends good morning wishes to all employees via email.

### Example 5: Run cron job several times a day (e.g. 01:00 and 13:00)

To specify more than one value for a field, you can simply specify a comma-separated list.

```txt
0 1,13 * * 5 /home/thomas/script.sh
```

- Field 1 = minute = 0
- Field 2 = hour = 1,13 (1 and 13)
- Field 3 = every day
- Field 4 = every month
- Field 5 = day of the week = 5 (Friday)

Use case: cron job that performs a database backup twice a day on Friday.

## Abbreviation for »run every … minutes/hours/…«

The crontab entry for a cron job to run every 10 minutes might look like this.

```txt
0,10,20,30,40,50 * * * * /home/thomas/script.sh
```

The same effect is produced by the following entry.

```txt
*/10 * * * * /home/thomas/script.sh
```

`*/10` stands for »every 10 minutes« or, to be more specific, »every minute that is a multiple of 10«. This notation works for all other fields as well. A more nested entry could look like this.

```txt
0-10/2 * * * * /home/thomas/script.sh
```

This cron job would be called every 2 minutes for the first 10 minutes.

## Predefined keywords

crontab provides some pre-defined keywords that make it easier to specify the time and more readable for humans.

### @reboot

Executed at system startup.

```txt
@reboot /home/thomas/script.sh
```

### @yearly / @annually

Executed once a year (i.e. at the beginning of the year).

Same as `0 0 1 1 *`

```txt
@yearly /home/thomas/script.sh
```

### @monthly

Executed once a month (i.e. at the beginning of the month).

Same as `0 0 1 * *`

```txt
@monthly /home/thomas/script.sh
```

### @weekly

Executed once a week (i.e. at the beginning of the week).

Same as `0 0 * * 0`

```txt
@weekly /home/thomas/script.sh
```

(Attention: crontab assumes the week starts with Sunday which may not be valid everywhere in the world.)

### @daily / @midnight

Executed once a day (i.e. at the beginning of the day).

Same as `0 0 * * *`

```txt
@daily /home/thomas/script.sh
```

### @hourly

Executed once an hour (i.e. at the beginning of the hour).

Same as `0 * * * *`

```txt
@hourly /home/thomas/script.sh
```

## Specifying commands

It’s always recommended to extract commands to dedicated shell scripts – but you can also specify commands directly in the cron job entry.

Such a cron job entry always consists of six arguments, each separated by spaces. Starting at the fifth space, everything that follows is interpreted as a command. This means that you can also specify commands with spaces without invalidating the cron job.

```txt
* * * * * /home/thomas/script.sh -a "Hello" -b "World" -c
```

This also allows you to combine several commands in one cron job entry.

```txt
* * * * * /home/thomas/one.sh && /home/thomas/two.sh
```

Please note that all examples assume that the corresponding shell scripts are marked as executable (i.e. having the »execute permission« which can be granted via `chmod +x script.sh`). If this isn’t the case, you can either set the proper permission or add a binary executable (e.g. `sh` or `bash`) to the commands in the cron job entries.

```txt
* * * * * sh /home/thomas/script.sh
```

## Save/discard crontab output

By default, crontab saves the output of the executed command to the mailbox of the corresponding user. However, it makes sense to save the output of crontab to a separate log file. This can be done with the following command.

```txt
* * * * * /home/thomas/script.sh >> /var/log/crontab_output.log 2>&1
```

If you don't want to save the output of crontab but just discard it, this can be realized with the following command.

```txt
*/10 * * * * /home/thomas/script.sh > /dev/null 2>&1
```
