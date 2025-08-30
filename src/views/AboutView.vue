<script setup lang="ts">
import CardInterface from '../components/MyCard.vue'
</script>

<template>
  <CardInterface
    customCardClass="''"
    customCardHeaderStyles="''"
    customCardTextStyles="color:#002564; font-variant:small-caps; padding: 20px; text-align:center"
    cardTitle=""
    cardSubTitle=""
    cardContents="You know that beautiful, fleeting moment after a teacher says, 'Have a great
                weekend,' and you feel that warm rush of freedom wash over you? That's the feeling.
                The feeling that your brain can finally shut off and a whole two days of zero
                obligations await. That's a lie. It's a cruel, beautifully wrapped lie. Because just
                as you're starting to plan a marathon of binge-watching, you realize that you actually have to learn and do work. And just like that, your grand plans of
                becoming a professional napper are replaced with a much more sobering reality:
                you're just a student with a stack of math problems and a rapidly shrinking window
                of fun. So here we are creating this web app"
  >
    <template v-slot:contents>
      <span class="d-flex justify-center">
        <v-icon icon="mdi-emoticon-cry-outline" size="100px" color="#002564"> </v-icon>
      </span>
    </template>
  </CardInterface>
</template>
