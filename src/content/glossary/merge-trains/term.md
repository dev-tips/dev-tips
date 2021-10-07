Title: Merge trains

-----

Description: A feature of GitLab that describes a queued list of merge requests intended to be integrated sequentially and in the correct order into the corresponding main branch, facilitating high development speed.

-----

Authors: rasshofer

-----

Text:

Merge trains facilitate parallel execution in order to shorten the waiting time until changes are executed. Up to four pipelines run in parallel, all of which assume that the previous request has worked.

Instead of simply queuing and waiting, each merge request takes the completed state of the previous (pending) merge (i.e. the merge result of the merge), adds its changes, and starts the pipeline immediately in parallel (assuming that everything is going to pass).

This means that a restart is only necessary if an error occurs, not wasting pipeline time on queuing or retrying.
