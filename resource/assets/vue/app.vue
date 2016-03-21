<template>
  <div class="body-wrap">
    <div class="side-wrap">
      <header>
        <img src="../assets/svg/fb-logo-white.svg" alt="Fothebys Auction House">
      </header>
      <nav>
        <a v-link="'/page/lot-items'" class="nav-core">Lot Items</a>
        <a :href="" class="nav-core">Auction Events</a>
        <a :href="" class="nav-core">Employees</a>
      </nav>
    </div>

    <div class="content-wrap">
      <!-- <router-view class="view" keep-alive></router-view> -->
      <router-view></router-view>
    </div>

  </div>
</template>

<style>
.nav-core {
  color: #fff;
  display: block;
  padding: 2em 0 2em 3em;
  cursor: pointer;
}
</style>
