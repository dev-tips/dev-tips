Title: ADR

-----

Alias: Architectural Decision Record

-----

Description: A decision or choice that satisfies a functional or non-functional requirement and that is architecturally significant to a project, similar to capturing personal notes or meeting minutes. The collection of ADRs created and maintained in a project constitutes the decision log.

-----

Authors: rasshofer

-----

Text:

Usually ADRs can be contained within the project repository or project wiki and receive a consecutive number (e.g. `ADR-123`) and short title of the solved problem and solution (e.g. `Automatic layouting for main navigation flyouts`) to be referenced in other ADRs or documents.

The following template can be used and describes the key features of a decision discussion and solution documentation.

```md
# [Consecutive number]-[Short title of the solved problem and solution]

- Status: Proposal | Rejected | Accepted | Replaced by ADR-123
- Decision maker: [List of all persons involved in the decision]
- Date: YYYY-MM-DD
- Relevant/Affected Stories: Description | Ticket/Issue URLs

## Context / Problem / Decision Driver

[Description of context, problem statement and decision drivers in free form with 2-3 sentences]

## Options considered / advantages and disadvantages

### [Option 1]

[more detailed description if necessary]

- Good because [argument]
- Good, because [argument]
- Bad, because [argument]

### [Option 2]

[more detailed description, if applicable]

- Good, because [argument]
- Good, because [argument]
- Bad, because [argument]

### [Option 3]

[more detailed description, if applicable]

- Good, because [argument]
- Good, because [argument]
- Bad, because [argument]

## Decision result

Option chosen: [option XYZ] because [justification].

### Positive consequences

- …
- …
- …

### Negative consequences

- …
- …
- …

### Links

- …
- …
- …
```
