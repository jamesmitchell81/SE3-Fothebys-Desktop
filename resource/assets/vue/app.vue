<template>
<div class="body-wrap">


  <div class="side-wrap">
    <header>
      <img src="../assets/svg/fb-logo-white.svg" alt="Fothebys Auction House">
    </header>
    <nav>
      <div class="nav-core">Lot Items</div>
      <div class="nav-core">Auction Events</div>
      <div class="nav-core">Employees</div>
    </nav>
  </div>

  <div class="content-wrap">

    <router-view class="view" keep-alive></router-view>

<!--       <div class="page-title-bar">
              </div>

      <component :is="view"></component>

      <div class="nav-tiles">
        <div class="nav-tile">
          Add Item
        </div>

        <div class="nav-tile">
          Search Items
        </div>
      </div> -->
  </div>

</div>
</template>


<style>

</style>
