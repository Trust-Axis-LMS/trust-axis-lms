# Guide: Proposing Text Changes to the Frontend

This guide outlines the standard workflow for proposing text updates to the frontend application.

## Prerequisites: Accessing the Repository
The codebase is hosted in a **private** repository.
1. Provide your GitHub-associated email address to the development team.
2. Once access is granted, you can view the repository using the link below:
   
   [**🔗 Trust Axis LMS Repository**](https://github.com/Trust-Axis-LMS/trust-axis-lms) 
   *(Note: This link will return a "404 Not Found" error until you have been granted access.)*

---

## Step-by-Step Workflow

### 1. Clone the Repository (Or use GitHub Web)
To work locally, clone the repository to your machine. Open your terminal and run:
```bash
git clone https://github.com/Trust-Axis-LMS/trust-axis-lms.git
cd trust-axis-lms
```
*(Note: If you are making a very small text change and prefer not to clone the repository locally, you can also make edits, create a branch, and open a PR entirely through the GitHub Web UI).*

### 2. Create a New Branch
To ensure the `main` branch remains stable, create a new branch for your changes before making edits:
```bash
git checkout -b text-updates-home-page
```

### 3. Make Your Changes
Open the project in your code editor. Make the necessary text updates and save your files.

### 4. Commit Your Changes
Stage and commit your changes with a clear message:
```bash
git add .
git commit -m "Updated welcome text on the home page"
```

### 5. Push Your Changes
Push your new branch up to the remote repository:
```bash
git push origin text-updates-home-page
```

### 6. Create a Pull Request (PR)
Navigate to the repository on GitHub. You will see a prompt to **"Compare & pull request"** for your pushed branch. Click it, add a brief description, and submit the Pull Request.

---

## The Review Process
**Your changes will not merge directly into the `main` branch.** 

Creating a Pull Request acts as a safe staging area. Here is what happens next:
1. **Developer Review:** The development team will review the PR to ensure the text changes don't accidentally introduce code errors or layout breaks.
2. **Merge & Deploy:** Once approved, the developer will handle merging your branch into `main`, which will trigger the updates to go live.
