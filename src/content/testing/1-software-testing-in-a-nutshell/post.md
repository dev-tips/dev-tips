Title: Software testing in a nutshell

-----

Date: 1610827318

-----

Description: The purpose of software testing is to improve the quality of software. The motivation is to not only detect errors in the source code of the software, but also to detect them as early as possible. Tests provide the assurance that software will work as expected in defined situations.

-----

Authors: rasshofer

-----

Text:

Software testing isn’t the only approach to improve software quality, but it’s one of the most important. The fact that inadequate software testing has corresponding consequences is exemplified by the computer-controlled radiation therapy machine »Therac-25« that massively overdosed six people due to an undetected functional error in its software and the lack of quality assurance that could have discovered this.

Another example is the loss of the »Mars Climate Orbiter« probe during its entry into the Martian atmosphere: an investigation revealed that the orbiter’s software wasn’t able to use metric units and the probe was destroyed by frictional forces and heat. Its navigation software was designed for the imperial system and was only tested with it.

These two examples highlight the importance of software testing as both incidents were able to be traced back to a software error that wasn’t detected in testing.

In fact, it’s not uncommon for more than 30-50% of the project effort to be allocated to testing effort. The following set of rules can be considered as the generic objectives of testing.

1. Testing involves the process of running software with the intent of finding a bug.
2. A _good test case_ is characterized by a high probability of finding a bug that hasn’t yet been discovered.
3. A _successful test_ uncovers bugs not yet discovered.

While one may initially assume that a successful test case is one that finds no bugs, the test objectives differ from this general assumption. One conclusion may be that testing software uncovers different classes of bugs with minimal time and effort.

However, despite extensive feedback, software testing can’t reveal the absence of defects, only that software defects are present.

In general, software testing is a mix of verification and validation.

_Verification_ refers to the set of activities that ensure that the software, at a given point in its development, meets the particular requirements assumed and defined for it, or fully implements a specific function. »Are we building the software right?« describes verification.

_Validation_ refers to another set of activities, which ensure that the requirements of the client and/or the intended application characteristics are fulfilled by the developed software product in the end. »Are we developing the right software?« describes validation.
