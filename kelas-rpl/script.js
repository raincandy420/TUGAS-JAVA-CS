function updateClock() {
    const clockElement = document.getElementById('clock');
    
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // Add leading zeros to minutes and seconds
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    // 12-hour format (optional)
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Format the time string
    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    
    // Update the clock element
    clockElement.innerText = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Call updateClock to set the initial time
updateClock();
const clockContainer = document.getElementById('clock-container');
const clock = document.getElementById('clock');
const infoSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
infoSvg.setAttribute("viewBox", "0 0 32 32");
infoSvg.setAttribute("width", "32");
infoSvg.setAttribute("height", "32");
infoSvg.setAttribute("fill", "#03fa6e");
infoSvg.style.cursor = "pointer";
infoSvg.style.marginTop = "8px";
infoSvg.innerHTML = `
  <g>
    <path d="M16 2.672l-5.331 5.331v-2.133h-4.265v6.398l-3.755 3.755 0.754 0.754 12.597-12.597 12.597 12.597 0.754-0.754-13.351-13.351zM7.47 6.937h2.132v2.132l-2.133 2.133v-4.265z"/>
    <path d="M6.404 16.533v12.795h7.464v-7.464h4.265v7.464h7.464v-12.795l-9.596-9.596-9.596 9.596zM24.53 28.262h-5.331v-7.464h-6.398v7.464h-5.331v-11.287l8.53-8.53 8.53 8.53v11.287z"/>
  </g>
`;
infoSvg.onclick = function() {
    window.location.href = "index.html";
};
clockContainer.appendChild(infoSvg);