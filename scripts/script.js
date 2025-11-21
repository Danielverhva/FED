
document.addEventListener('DOMContentLoaded', function () {
   
    function idForMenu(name) {
      if (!name) return null;
      return 'open-' + String(name).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-_]/g, '');
    }
    function ensureWrapAndAreas() {
      // Voegt een .wrap class toe aan de eerste div in de header
      var header = document.getElementsByTagName('header')[0];
      var firstDiv = header && header.querySelector('div');
      if (firstDiv && !firstDiv.classList.contains('wrap')) firstDiv.classList.add('wrap');
  
      // Vind de nav list (Eerste ul in de nav) en geeft .nav-list
      var nav = header && header.querySelector('nav');
      if (nav) {
        var ul = nav.querySelector('ul');
        if (ul && !ul.classList.contains('nav-list')) ul.classList.add('nav-list');
      }
  
      // Vind de utils area: de eerste div na nav in de header
      if (firstDiv) {
        var children = Array.prototype.slice.call(firstDiv.children);
        // Vind het element die search/cta/hamburger heeft
        var utils = children[children.length - 1];
        if (utils && !utils.classList.contains('utils')) utils.classList.add('utils');
        // Markering voor de tyling van de hamburger button
        var btns = utils && utils.querySelectorAll('button');
        if (btns && btns.length > 0) {
          
          var mobileBtn = btns[btns.length - 1];
          if (mobileBtn && !mobileBtn.classList.contains('hamburger')) mobileBtn.classList.add('hamburger');
        }
      }
    }
   //Video afspelen en pauzeren, Moet nog de play knop wijzigen naar een afbeelding die veranderd
    var video = document.getElementById("Bo7Video");
    var debtn = document.getElementById("debtn")

    debtn.onclick= videoAfspelen
    
    function videoAfspelen() {
        if (video.paused){
            video.play();
            debtn.innerHTML = "Pauze"
        } else{
            video.pause()
            debtn.innerHTML = "Play"
        }

        

    }
  
    ensureWrapAndAreas();
  
    
    var header = document.getElementsByTagName('header')[0];
    var navList = header && header.querySelector('ul[role="menubar"]');
    var searchToggle = header && header.querySelector('button[aria-label="Zoeken"]');
    var searchPanel = header && header.querySelector('div[aria-hidden]');
    var mobileToggle = header && header.querySelector('button.hamburger');
    var mobileDialog = document.querySelector('[role="dialog"]');
    var mobileClose = mobileDialog && mobileDialog.querySelector('button[aria-label="Sluit"]');
  
    // Voor iedere li[data] die in de nav staat wordt een class of id getoggled
    if (navList) {
      var items = navList.querySelectorAll('li[data-menu]');
      items.forEach(function (item) {
        var btn = item.querySelector('button[aria-haspopup]');
        var panel = item.querySelector('[role="menu"]');
        var menuName = item.getAttribute('data-menu');
        var toggleId = idForMenu(menuName);
  
       
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (panel) panel.setAttribute('aria-hidden', 'true');
  
        if (!btn || !panel) return;
  
        btn.addEventListener('click', function (e) {
          var isOpen = item.classList.contains('open');
  
          // sluit sndere
          items.forEach(function (other) {
            if (other === item) return;
            if (other.classList.contains('open')) {
              other.classList.remove('open');
              var otherName = other.getAttribute('data-menu');
              var otherId = idForMenu(otherName);
              if (otherId && other.id === otherId) other.removeAttribute('id');
              var otherBtn = other.querySelector('button[aria-haspopup]');
              var otherPanel = other.querySelector('[role="menu"]');
              if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
              if (otherPanel) otherPanel.setAttribute('aria-hidden', 'true');
            }
          });
  
          // toggle deze
          if (isOpen) {
            item.classList.remove('open');
            if (toggleId && item.id === toggleId) item.removeAttribute('id');
            btn.setAttribute('aria-expanded', 'false');
            panel.setAttribute('aria-hidden', 'true');
          } else {
            item.classList.add('open');
            if (toggleId) item.setAttribute('id', toggleId);
            btn.setAttribute('aria-expanded', 'true');
            panel.setAttribute('aria-hidden', 'false');
          }
        });
      });
  
      // Click buiten de nav om hem te sluiten
      document.addEventListener('click', function (e) {
        if (!e.target.closest('nav')) {
          items.forEach(function (it) {
            if (it.classList.contains('open')) {
              it.classList.remove('open');
              var name = it.getAttribute('data-menu');
              var id = idForMenu(name);
              if (id && it.id === id) it.removeAttribute('id');
              var b = it.querySelector('button[aria-haspopup]');
              var p = it.querySelector('[role="menu"]');
              if (b) b.setAttribute('aria-expanded', 'false');
              if (p) p.setAttribute('aria-hidden', 'true');
            }
          });
        }
      });
    }
  
    
  
    // Mobile voorgrond
    function openMobile() {
      document.body.classList.add('mobile-open');
      document.body.setAttribute('id', 'mobile-open');
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
      if (mobileDialog) mobileDialog.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeMobile() {
      document.body.classList.remove('mobile-open');
      if (document.body.id === 'mobile-open') document.body.removeAttribute('id');
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      if (mobileDialog) mobileDialog.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function () {
        if (document.body.classList.contains('mobile-open')) closeMobile(); else openMobile();
      });
    }
    if (mobileClose) {
      mobileClose.addEventListener('click', function () {
        closeMobile();
      });
    }
  
    // ESC sluit alle UI
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        // nav list
        if (navList) {
          var openItems = navList.querySelectorAll('li.open');
          openItems.forEach(function (it) {
            it.classList.remove('open');
            var name = it.getAttribute('data-menu');
            var id = idForMenu(name);
            if (id && it.id === id) it.removeAttribute('id');
            var b = it.querySelector('button[aria-haspopup]');
            var p = it.querySelector('[role="menu"]');
            if (b) b.setAttribute('aria-expanded', 'false');
            if (p) p.setAttribute('aria-hidden', 'true');
          });
        }
    
        const deButton = document.querySelector('hamburger');

  deButton.onclick = togglemenu;
  
  function togglemenu(){
    deButton.classList.toggle("is-open");
    
  } 
    };
  
    
                 window.addEventListener('resize', function () {
                 if (window.innerWidth > 900) {
                if (document.body.classList.contains('mobile-open')) closeMobile();
             }
        });
    })})
