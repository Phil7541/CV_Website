Vue.createApp({
  data() {
    return {
      content: []
    };
  },

  methods: {
    idFormatted(title) {
      return title.toLowerCase().replace(/\s+/g, '-');
    },

    navIdFormatted(title) {
      return "nav-" + this.idFormatted(title);
    },

    navHrefFormatted(title) {
      return "#" + this.idFormatted(title);
    },

    updateActiveNav() {
      // Remove active from all
      this.content.forEach(section => {
        const navId = this.navIdFormatted(section.title);
        const navElement = document.getElementById(navId);

        if (navElement) {
          navElement.classList.remove("active");
        }
      });

      const nav = document.querySelector("nav");
      const navHeight = nav ? nav.offsetHeight : 0;

      const activeThreshold = navHeight + 80;

      let active = "";
      
      // Find active section
      this.content.forEach(section => {
        const id = this.idFormatted(section.title);
        const element = document.getElementById(id);

        if (element && element.getBoundingClientRect().top <= activeThreshold) {
          active = id;
        }
      });

      // Add active to current section
      if (active) {
        const navElement = document.getElementById("nav-" + active);

        if (navElement) {
          navElement.classList.add("active");
        }
      }
    }
  },

  mounted() {
    fetch("content.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
      })
      .then(data => {
        this.content = data.content;

        this.$nextTick(() => {
          this.updateActiveNav();
        });
      })
      .catch(error => {
        console.error("Error loading content:", error);
      });

    window.addEventListener("scroll", this.updateActiveNav);
    window.addEventListener("resize", this.updateActiveNav);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.updateActiveNav);
    window.removeEventListener("resize", this.updateActiveNav);
  }
}).mount('#app');