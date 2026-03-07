let currentTab = 'all';
const tabActive = ['bg-primary', 'text-white'];
const tabInactive = ['bg-white', 'text-[#64748B'];

function switchTab(tab){
    // console.log(tab);
    const tabs = ['all', 'open', 'closed'];

    for(const t of tabs){
        const tabName = document.getElementById('tab-'+t)
        if(t === tab){
            tabName.classList.remove(...tabInactive);
            tabName.classList.add(...tabActive);
        }
        else{
            tabName.classList.add(...tabInactive);
            tabName.classList.remove(...tabActive);
        }
    }
}
switchTab(currentTab);