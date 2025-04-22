document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const container = document.getElementById("channelContainer");
  const searchInput = document.getElementById("searchInput");

  // Dummy channel data (replace with actual API response or M3U data)
  const channels = {
    "Live Now": [
      {
        name: "TOFFEE Sports VIP",
        url: "https://bldcmprod-cdn.toffeelive.com/cdn/live/sports_highlights/playlist.m3u8",
        img: "https://images.toffeelive.com/images/program/19779/logo/240x240/mobile_logo_975410001725875598.png",
      },
      {
        name: "TOFFEE Movies VIP",
        url: "https://bldcmprod-cdn.toffeelive.com/cdn/live/toffee_movie/playlist.m3u8",
        img: "https://images.toffeelive.com/images/program/2708/logo/240x240/mobile_logo_724353001725875591.png",
      },
    ],
  };

  function renderAllChannels() {
    container.innerHTML = "";
    for (const category in channels) {
      const section = document.createElement("div");
      section.id = category;
      const heading = document.createElement("h3");
      heading.textContent = category;

      let grid;
      if (category === "Live Now") {
        grid = document.createElement("div");
        grid.className = "channel-grid";
        channels[category].forEach(channel => {
          const div = document.createElement("div");
          div.className = "channel small-channel";
          div.onclick = () => {
            window.location.href = `player.html?stream=${encodeURIComponent(channel.url)}&category=${encodeURIComponent(category)}&name=${encodeURIComponent(channel.name)}&logo=${encodeURIComponent(channel.img)}`;
          };
          div.innerHTML = `
            <div class="thumbnail-container">
              <img src="${channel.img}" alt="${channel.name}" />
            </div>
            <span>${channel.name}</span>
          `;
          grid.appendChild(div);
        });
        section.appendChild(heading);
        section.appendChild(grid);
        container.appendChild(section);
      }
    }
  }

  function filterChannels(query) {
    container.innerHTML = "";
    const resultGrid = document.createElement("div");
    resultGrid.className = "channel-grid";

    for (const category in channels) {
      channels[category].forEach(channel => {
        if (channel.name.toLowerCase().includes(query)) {
          const div = document.createElement("div");
          div.className = "channel";
          div.onclick = () => {
            window.location.href = `player.html?stream=${encodeURIComponent(channel.url)}&category=${encodeURIComponent(category)}&name=${encodeURIComponent(channel.name)}&logo=${encodeURIComponent(channel.img)}`;
          };
          div.innerHTML = `
            <div class="thumbnail-container">
              <img src="${channel.img}" alt="${channel.name}" />
            </div>
            <span>${channel.name}</span>
          `;
          resultGrid.appendChild(div);
        }
      });
    }

    if (resultGrid.children.length === 0) {
      container.innerHTML = `<p style="text-align:center; padding: 20px;">কোনো চ্যানেল পাওয়া যায়নি</p>`;
    } else {
      container.appendChild(resultGrid);
    }
  }

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    if (!query) {
      renderAllChannels();
    } else {
      filterChannels(query);
    }
  });

  renderAllChannels();
  if (loader) loader.style.display = "none";
});

// Scroll to top button functionality
const scrollBtn = document.getElementById("scrollToTopBtn");
window.onscroll = () => {
  scrollBtn.style.display = (window.scrollY > 100) ? "block" : "none";
};
scrollBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
