**Live link**: [https://brighthr-frontend-task-sharooqsalaudeens-projects.vercel.app](https://brighthr-frontend-task-sharooqsalaudeens-projects.vercel.app)

_(Mobile repsonsive Design with Server and Client side rendering)_

### The task

Use the fake endpoints provided to create a list of absences.

1. For each absence show:
    - start date
    - end date
    - employee name
    - approved/pending approval
    - absence type
2. Include a visual indication that an absence has conflicts.
3. Allow the list to be sorted by dates, absence type, and name.
4. When an employee's name is clicked show all of their absences.

**The endpoints**

`https://front-end-kata.brighthr.workers.dev/api/absences` will return a full list of all absences.

`https://front-end-kata.brighthr.workers.dev/api/conflict/{id}` for a given absence id will indicate if there are conflicts or not.
