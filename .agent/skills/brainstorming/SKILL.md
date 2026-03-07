---
name: brainstorming
description: Explores user intent, requirements, and design before implementation. Use when the user wants to brainstorm, create a new feature, build components, or start a new project.
---

# Brainstorming Ideas Into Designs

Help turn ideas into fully formed designs and specs through natural collaborative dialogue. Start by understanding the current project context, then ask questions to refine the idea. Present the design and get user approval before writing any code.

<HARD-GATE>
Do NOT invoke any implementation skill, write any code, scaffold any project, or take any implementation action until you have presented a design and the user has approved it. This applies to EVERY project regardless of perceived simplicity.
</HARD-GATE>

## When to use this skill
- User asks to brainstorm a new idea or feature.
- User wants to start a new project but hasn't solidified the requirements.
- Any new creative work before implementation.

## Workflow

Complete these checklist items in order:
- [ ] **Explore project context:** Check files, docs, and recent commits.
- [ ] **Ask clarifying questions:** One at a time, to understand purpose, constraints, and success criteria. Prefer multiple choice questions when possible.
- [ ] **Propose 2-3 approaches:** Detail trade-offs and your recommendation.
- [ ] **Present design sections:** Scale section lengths to complexity. Ask for user approval after each section (Architecture, Components, Data Flow, Error Handling, Testing).
- [ ] **Write design doc:** Save the validated design to `docs/plans/YYYY-MM-DD-<topic>-design.md`.
- [ ] **Transition to implementation:** Suggest using the `planning` skill.

## Instructions

*   **One question at a time:** Don't overwhelm with multiple questions.
*   **YAGNI ruthlessly:** Remove unnecessary features from all designs.
*   **Incremental validation:** Present the design and get approval before moving on.
*   **The Terminal State:** Do NOT write code. The only next step after the design is approved and saved is invoking the **planning** skill.
