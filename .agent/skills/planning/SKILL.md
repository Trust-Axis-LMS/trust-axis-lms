---
name: planning
description: Writes comprehensive implementation plans using bite-sized tasks. Use when the user has completed brainstorming or has a spec and needs a structured step-by-step technical plan before touching code.
---

# Writing Plans

Write comprehensive implementation plans assuming the engineer executing them has zero context for the codebase. Document everything they need to know: which exact files to touch, required code snippets, testing methods, and commit steps.

## When to use this skill
- User asks to write an implementation plan.
- The brainstorming phase is complete and a design document exists.
- The user provides a spec for a multi-step task.

## Workflow
Create a markdown plan document located at `docs/plans/YYYY-MM-DD-<feature-name>.md`. 

The document must contain:
1.  **Header:** Feature name, Goal, Architecture, Tech Stack.
2.  **Bite-Sized Tasks:** Each step should represent one discrete action (2-5 minutes of work).
3.  **Handoff:** Offer the user execution options once the plan is saved.

## Instructions

### Task Granularity
Every task must follow a strict, test-driven, incremental pattern:
*   "Write the failing test"
*   "Run it to make sure it fails"
*   "Implement minimal code to make test pass"
*   "Run tests and make sure they pass"
*   "Commit"

### Task Output Template
Use this exact structure for tasks inside the plan document:

```markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py:123-145`

**Step 1: Write the failing test**
(Insert code snippet here)

**Step 2: Run test to verify it fails**
Run: `pytest tests/path/test.py::test_name -v`
Expected: FAIL

**Step 3: Write minimal implementation**
(Insert code snippet here)

**Step 4: Run test to verify it passes**
Run: `pytest tests/path/test.py::test_name -v`
Expected: PASS

**Step 5: Commit**
(Insert exact `git add` and `git commit` commands here)
```

## Post-Plan Execution Handoff
After saving the plan, ask the user:
*"Plan complete and saved to `docs/plans/<filename>.md`. Would you like me to begin executing this plan task-by-task right now, or should we review it first?"*
