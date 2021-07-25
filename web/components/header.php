<header>
  <headerLeft>
    <div class="headerButton toggleLeftNaviButton">
      <span class="material-icons">menu</span>
    </div>

    <a href="/" class="headerLogo noSel">
      <img src="img/icons/logo.svg"/>
    </a>
  </headerLeft>

  <headerCenter>
    <input class="headerSearchInput" placeholder="<?=$l->t('HEADER_SEARCH')?>"/>
    <div class="mainSearchButton">
      <span class="material-icons">search</span>
    </div>
  </headerCenter>

  <headerRight>
    <div class="headerButton uploadButton">
      <span class="material-icons">upload</span>
    </div>
    <div class="headerButton bookmarkButton">
      <span class="material-icons">bookmark_border</span>
    </div>
    <div class="headerButton notificationsButton">
      <span class="material-icons">notifications_none</span>
    </div>
    <div class="headerButton friendsButton">
      <span class="material-icons">people_outline</span>
    </div>
    <div class="headerButton levelButton">
      <span class="material-icons">border_outer</span>
    </div>
    <div class="headerButton userButton">
      <img src="img/icons/avatar.png"/>
    </div>
  </headerRight>

  <sideNavi>
    <headerLeft>
      <div class="headerButton toggleLeftNaviButton">
        <span class="material-icons">menu</span>
      </div>

      <a href="/" class="headerLogo">
        <img src="img/icons/logo.svg"/>
      </a>
    </headerLeft>

    <a href="" class="naviButton">
      <span class="material-icons">home</span> <!--weicon-home-->
      <?=$l->t('NAVI_CHANNEL')?>
    </a>
    <a href="" class="naviButton">
      <span class="material-icons">star</span> <!--star-->
      <?=$l->t('NAVI_SUBSCRIBERS')?>
    </a>
    <a href="" class="naviButton">
      <span class="material-icons">lightbulb</span> <!--weicon-lightbulb-->
      <?=$l->t('NAVI_RECOMMENDED')?>
    </a>
    <a href="" class="naviButton">
    <span class="material-icons">movie</span> <!--weicon-videos-->
      <?=$l->t('NAVI_VIDEOS')?>
    </a>
    <a href="" class="naviButton">
      <span class="material-icons">settings</span>
      <?=$l->t('NAVI_OPTIONS')?>
    </a>
    <a href="" class="naviButton">
      <span class="material-icons">logout</span>
      <?=$l->t('NAVI_LOGOUT')?>
    </a>
  </sideNavi>
  <sideNaviBg></sideNaviBg>

  <miniWedeoContainer style="display:none;">
    <div class="miniWedeoHeader">
      <div class="miniWedeoHeaderTitle"></div>
      <div class="miniWedeoHeaderClose"><span class="material-icons">close</span></div>
    </div>
    <div class="miniWedeo"></div>
    <div class="miniWedeoContent"></div>
  </miniWedeoContainer>

  <script type="text/javascript">
    $('.toggleLeftNaviButton').click( function() {
      if( $('sideNavi').hasClass('open') ) {
        closeNavi();
      } else {
        openNavi();
      }
    });

    $('sideNaviBg').click( function() {
      closeNavi();
    });

    function openNavi() {
      const self = this;

      $('sideNavi, sideNaviBg').addClass('open');
      $('mainContainer, header, miniWedeoContainer').addClass('blur');
      $('body').addClass('of-hidden');
    }

    function closeNavi() {
      $('sideNavi, sideNaviBg').removeClass('open');
      $('mainContainer, header, miniWedeoContainer').removeClass('blur');
      $('body').removeClass('of-hidden');
    }

    $('.miniWedeoHeaderClose').click( function() {
      closeMiniplayer();
    });

    dragMiniPlayer( $(".miniWedeoHeader") );
  </script>

</header>
