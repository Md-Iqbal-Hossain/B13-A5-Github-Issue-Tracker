let currentTab = 'all';
const tabActive = ['bg-primary', 'text-white'];
const tabInactive = ['bg-white', 'text-[#64748B'];

const issuesContainer = document.getElementById("issuesContainer");

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
}

async function loadIssues() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    console.log(data);
    displayIssues(data.data);
}

function displayIssues(issues) {
    issues.forEach(issue => {
        console.log(issue);
        const card = document.createElement('div');
        card.className = 'card bg-base-100 w-full shadow-sm border-t-4 border-green-500';

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
                            <img src="assets/Open-Status.png" alt="">
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

switchTab(currentTab);
loadIssues()