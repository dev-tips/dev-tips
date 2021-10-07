Title: Event Sourcing

-----

Description: The state of an application is persisted as a sequence of individual serialized events that have led to the current state over time. Basicaly, a log is kept of what has happened in the system.

-----

Authors: rasshofer

-----

Text:

A database that works in this way is called an »event store«. This solves the issue of changes not being traceable and resetting of changes that have already been made not being possible.

Along the way, event sourcing collects more and more data over time, providing a history and audit log that are great for reporting and data analysis. Reading the current state in event sourcing basically means replaying: all entries are replayed and aggregated in their original order. This is not only possible for the current state but for any time in the past, allowing to reinterpret the past to gain insights and learn for the future.

If necessary, old events that are no longer needed can be deleted as long as a snapshot exists on which a replay can be based.
