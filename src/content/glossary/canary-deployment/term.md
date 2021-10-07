Title: Canary Deployment

-----

Description: A way to release a new version of a software while ensuring early fault detection. By gradually redirecting traffic to the new release, meaningful indications can be given about its functionality (under real load with real users).

-----

Authors: rasshofer

-----

Text:

Similar to a (term: Blue Green Deployment text: blue green deployments), there are at least two production systems. One of the two systems (or parts of it) receives the update(s).

Now the updated part can be tested (both automated and manually). To do so, a defined amount of traffic is routed to the updated system.

For example, a canary deployment plan could define that after an upgrade, 10% of all traffic will be routed to that new release. The other 90% of users still see the previous release. If no problems occur, the percentage gets increased (gradually or at one go). In case problems occur, a maximum of 10% of users are affected. A rollback is possible immediately.

Thus, an early warning system is available. That’s also where the name of this process origins from: to have an early warning system against toxic gases, miners in coal mines placed canary birds in cages. In case toxic gases escaped, the canary birds died and the workers were able to quickly escape the mines.

However, this additional comfort and security also introduces some challenges in terms of infrastructure, deployment processes, and releasing (e.g. dealing with changes to the database).
