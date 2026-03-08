let currentTab = 'all';

let allIssues = [];

const tabActive = ['bg-primary', 'text-white'];
const tabInactive = ['bg-white', 'text-[#64748B'];

const issuesContainer = document.getElementById("issuesContainer");

const loadingSpinner = document.getElementById("loadingSpinner");

const issueCount = document.getElementById("issueCount");

function switchTab(tab) {
    // console.log(tab);
    const tabs = ['all', 'open', 'closed'];

    for (const t of tabs) {
        const tabName = document.getElementById('tab-' + t)
        if (t === tab) {
            tabName.classList.remove(...tabInactive);
            tabName.classList.add(...tabActive);
        }
        else {
            tabName.classList.add(...tabInactive);
            tabName.classList.remove(...tabActive);
        }
    }

    // filter issues
    showLoading();

    setTimeout(() => {

        if (tab === 'all') {
            displayIssues(allIssues);
        }
        else {
            const filtered = allIssues.filter(issue => issue.status === tab);
            displayIssues(filtered);
        }

        hideLoading();

    }, 300);
}

function showLoading() {
    loadingSpinner.classList.remove('hidden');
    issuesContainer.innerHTML = '';
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

async function loadIssues() {
    showLoading();

    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    console.log(data);

    allIssues = data.data;
    hideLoading();
    displayIssues(allIssues);
}

function displayIssues(issues) {
    issuesContainer.innerHTML = '';

    // update stat bar count
    issueCount.innerText = `${issues.length} Issues`;

    issues.forEach(issue => {
        console.log(issue);
        const card = document.createElement('div');
        card.onclick = () => loadIssueDetails(issue.id);
        card.className = `cursor-pointer card bg-base-100 w-full shadow-sm border-t-4 ${issue.status === 'open' ? 'border-green-500' : 'border-purple-500'}`;

        // status image
        const statusImage = issue.status === 'open'
            ? '<img src="assets/Open-Status.png" alt="">'
            : '<img src="assets/Closed- Status .png" alt="">';

        // Set priority badge classes dynamically
        let priorityClass = '';
        if (issue.priority.toLowerCase() === 'high') {
            priorityClass = 'bg-red-100 text-red-600';
        } else if (issue.priority.toLowerCase() === 'medium') {
            priorityClass = 'bg-yellow-100 text-yellow-600';
        } else {
            priorityClass = 'bg-gray-100 text-gray-500';
        }

        // label colors
        const labelColors = {
            'bug': 'bg-red-100 text-red-600 border-1 border-red-300',
            'help wanted': 'bg-yellow-100 text-yellow-600 border-1 border-yellow-300',
            'documentation': 'bg-gray-100 text-gray-600 border-1 border-gray-300',
            'good first issue': 'bg-blue-100 text-blue-600 border-1 border-blue-300',
            'enhancement': 'bg-green-100 text-green-600 border-1 border-green-300'
        };

        // format date
        const dateObj = new Date(issue.createdAt);
        const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;

        card.innerHTML = `
        <div class="flex justify-between px-6 mt-4">
                        <div>
                            ${statusImage}
                        </div>
                        <div class="badge badge-soft ${priorityClass} rounded-2xl">${issue.priority.toUpperCase()}</div>
                    </div>

                    <div class="card-body mt-[-16px]">
                        <h2 class="card-title text-sm md:text-base">${issue.title}</h2>
                        <p class="text-[#64748B] line-clamp-2
                        
                        ">${issue.description}</p>

                        <!-- dynamic label badges -->
                        <div class="flex flex-wrap gap-2 mt-2 mr-2 w-full">
                            ${issue.labels.map(label => {
            const colorClass = labelColors[label.toLowerCase()] || 'bg-gray-100 text-gray-600';

            let icon = '';
            if (label.toLowerCase() === 'bug') icon = '<img src="assets/BugDroid.png" class="w-3 h-3" alt=""> ';
            else if (label.toLowerCase() === 'help wanted') icon = '<img src="assets/Lifebuoy.png" class="w-3 h-3" alt=""> ';

            return `<div class="badge badge-soft rounded-2xl ${colorClass} flex items-center gap-1 text-xs md:text-[12px] lg:text-[14px] px-2 py-1">
                                            ${icon}${label}
                                        </div>`;
        }).join('')}
                        </div>
                    </div>

                    <hr class="border-gray-300">

                    <div class="flex flex-col py-4 px-6 gap-1 text-sm">
                        <p class="text-[#64748B]">#${issue.id} by ${issue.author}</p>
                        <p class="text-[#64748B]">${formattedDate}</p>
                    </div>`;
        issuesContainer.appendChild(card);


    })
}

async function loadIssueDetails(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const issue = data.data;
    showIssueModal(issue);
}

function showIssueModal(issue) {

    const dateObj = new Date(issue.createdAt);
    const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

    const labelColors = {
        'bug': 'bg-red-100 text-red-600 border-1 border-red-300',
        'help wanted': 'bg-yellow-100 text-yellow-600 border-1 border-yellow-300',
        'documentation': 'bg-gray-100 text-gray-600 border-1 border-gray-300',
        'good first issue': 'bg-blue-100 text-blue-600 border-1 border-blue-300',
        'enhancement': 'bg-green-100 text-green-600 border-1 border-green-300'
    };

    function formatName(str) {
        if (!str) return "";
        return str
            .replaceAll("_", " ")
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }

    document.getElementById("modalTitle").innerText = issue.title;
    document.getElementById("modalDescription").innerText = issue.description;
    const modalAuthor = document.getElementById("modalAuthor");

    let authorName = "Not Found";
    if (issue.author && issue.author.trim() !== "") {
        authorName = formatName(issue.author);
    }

    modalAuthor.innerText = `Opened by ${authorName}`;

    document.getElementById("modalDate").innerText = formattedDate;

    const statusBadge = document.getElementById("modalStatus");

    statusBadge.innerText = issue.status.toUpperCase();

    if (issue.status === "open") {
        statusBadge.className = "badge bg-green-500 text-white rounded-xl";
    }
    else {
        statusBadge.className = "badge bg-purple-500 text-white rounded-xl";
    }

    if (!issue.assignee || issue.assignee.trim() === "") {
        modalAssignee.innerText = "Not Found";
    } else {
        modalAssignee.innerText = formatName(issue.assignee);
    }

    const modalPriority = document.getElementById("modalPriority");

    let priorityClass = '';
    if (issue.priority.toLowerCase() === 'high') {
        priorityClass = 'bg-red-500';
    } else if (issue.priority.toLowerCase() === 'medium') {
        priorityClass = 'bg-yellow-500';
    } else {
        priorityClass = 'bg-gray-500';
    }

    modalPriority.className = `badge ${priorityClass} text-white rounded-xl`;
    modalPriority.innerText = issue.priority.toUpperCase();

    const labelsContainer = document.getElementById("modalLabels");

    labelsContainer.innerHTML = "";

    issue.labels.forEach(label => {
        const lowerLabel = label.toLowerCase();
        const colorClass = labelColors[lowerLabel] || 'bg-gray-100 text-gray-600';

        let icon = '';
        if (lowerLabel === 'bug') icon = '<img src="assets/BugDroid.png" class="w-3 h-3" alt=""> ';
        else if (lowerLabel === 'help wanted') icon = '<img src="assets/Lifebuoy.png" class="w-3 h-3" alt=""> ';

        const badge = document.createElement("div");
        badge.className = `badge badge-soft rounded-2xl ${colorClass} flex items-center gap-1 text-xs md:text-[12px] lg:text-[14px] px-2 py-1`;
        badge.innerHTML = `${icon}${label.replaceAll("_", " ")}`;
        labelsContainer.appendChild(badge);
    });

    document.getElementById("issue_detail_modal").showModal();
}

switchTab(currentTab);
loadIssues()