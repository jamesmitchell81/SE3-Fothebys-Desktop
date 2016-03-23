<template>
  <div>
    <table>
      <tr>
        <th>Full Name:</th>
        <td>{{ details.title }} {{ details.firstName }} {{ details.surname }}</td>
      </tr>
      <tr>
        <th>Telephone Number:</th>
        <td>{{ details.telNumber }}</td>
      </tr>
      <tr>
        <th>Email Address</th>
        <td>{{ details.emailAddress}}</td>
      </tr>
      <tr><th colspan="2">Address</th></tr>
      <tr><td colspan="2">{{ details.contactAddress.firstLine }}</td></tr>
      <tr><td colspan="2">{{ details.contactAddress.secondLine }}</td></tr>
      <tr><td colspan="2">{{ details.contactAddress.townCity }}</td></tr>
      <tr><td colspan="2">{{ details.contactAddress.postalCode }}</td></tr>
    </table>
    <span>edit</span>
  </div>
</template>

<script>

  export default {
    name: "ClientDetails",

    props: ['details'],
  }
</script>

<style>
  th {
    text-align: left;
  }
</style>

