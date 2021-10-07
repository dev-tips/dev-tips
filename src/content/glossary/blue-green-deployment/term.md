Title: Blue Green Deployment

-----

Description: A process where new software releases are tested in production environments before being activated to ensure early fault detection.

-----

Authors: rasshofer

-----

Text:

Basically, the productive system exists twice: once as a blue line, once as a green line. Only one of the two systems is ever active. The inactive system can be used for tests.

For this to work, the systems shall run on different (but as similar as possible) hardware or VMs. A new release then is imported and tested on the inactive system first. Once all tests were successful and everything is available, the inactive system becomes the active system and vice versa.

In other words: If the blue system was active and the green system was inactive, then the green system received the update and became active after successful tests. Now the blue system is inactive and receives the next upcoming update.

This facilitate going back to the old version very quickly and easily (»rollback«). In addition, a second system is always available in case of failures (e.g. hardware faults).

However, this additional comfort and security also introduces some challenges in terms of infrastructure, deployment processes, and releasing (e.g. dealing with changes to the database).
