<script setup>
import { HistoriaBanner, GaleriaCarousel, BackButton } from '@/components'
import router from '@/router'

// 🔹 Imagens corretamente importadas para produção Vercel
import inicio1 from '@/assets/img/GaleriaFrango/referencia.jpg'
import inicio2 from '@/assets/img/GaleriaFrango/inauguração 2.jpg'
import inicio3 from '@/assets/img/GaleriaFrango/inauguração 3.jpg'
import inicio4 from '@/assets/img/GaleriaFrango/inauguração.jpg'

import primeiros1 from '@/assets/img/GaleriaFrango/frente muito mais velha.jpg'
import primeiros2 from '@/assets/img/GaleriaFrango/maquinas.jpg'
import primeiros3 from '@/assets/img/GaleriaFrango/primeiros dias.jpg'
import primeiros4 from '@/assets/img/GaleriaFrango/frente velha.jpg'

import recentes1 from '@/assets/img/GaleriaFrango/frente media.jpg'
import recentes2 from '@/assets/img/GaleriaFrango/equipe.jpg'
import recentes3 from '@/assets/img/GaleriaFrango/equipe frente.jpg'

import logoImg from '@/assets/img/logo.png' 

const inicioImages = [
  { src: inicio1, alt: 'História 1' },
  { src: inicio2, alt: 'História 2' },
  { src: inicio3, alt: 'História 3' },
  { src: inicio4, alt: 'História 4' },
]

const primeirosAnosImages = [
  { src: primeiros1, alt: 'História 5' },
  { src: primeiros2, alt: 'História 6' },
  { src: primeiros3, alt: 'História 7' },
  { src: primeiros4, alt: 'História 8' },
]

const temposRecentesImages = [
  { src: recentes1, alt: 'História 9' },
  { src: recentes2, alt: 'História 10' },
  { src: recentes3, alt: 'História 11' },
]
</script>

<template>
  <BackButton @click="router.push('/home')" />

  <div class="historia-page">
    <HistoriaBanner />
     

    <div class="section-title" id="inicio">
      <hr class="line" />
      <h1>O Início</h1>
      <hr class="line" />
    </div>

   
    

    <p>
      Tudo começou no ano de 1994, em Joinville, quando um momento difícil se transformou em uma
      grande oportunidade.O dono Claudinei Bisewski, enfrentava problemas físicos, que dificultavam
      sua entrada no mercado de trabalho. Ao mesmo tempo, seu pai Tomás Bisewski havia sido demitido
      após décadas de dedicação na indústria Tigre. Duas gerações, duas histórias que, unidas,
      encontraram um novo caminho.
    </p>
    <GaleriaCarousel :imagens="inicioImages" />
    <p>
      Em meio a essa fase desafiadora, decidiram visitar familiares em Videira (SC). Foi nessa viagem
      que descobriram uma novidade que chamava a atenção: a venda de frango assado. Algo simples,
      mas inovador para a época, especialmente porque em Joinville eram poucos que forneciam esse tipo de
      serviço. Eles voltaram para casa com uma ideia na cabeça: levar esse sabor para a nossa cidade
      e conquistar os joinvilenses com qualidade e carinho.
    </p>
    <p>
      Com coragem e poucas economias, os dois montaram um espaço simples, mas cheio de propósito.
      Assim nasceu a La Casa Di Frango, com um compromisso que atravessa gerações: oferecer frangos
      assados preparados com dedicação, tempero caseiro e ingredientes selecionados, para que cada
      cliente leve para casa mais do que uma refeição – leve momentos de união e felicidade à mesa.
    </p>

    <div class="section-title" id="primeiros-anos">
      <hr class="line" />
      <h1>Primeiros Anos</h1>
      <hr class="line" />
    </div>

    <!-- Carrossel com imagens dos primeiros anos -->
   

    <p>
      No dia 7 de setembro de 1995, nascia a La Casa Di Frango. A inauguração foi marcada por uma
      festa simples, mas cheia de significado, reunindo cerca de 30 pessoas – vizinhos, amigos da
      igreja e familiares. Naquele primeiro dia, saíram do forno apenas 7 frangos e 2 espetos de
      costela, preparados com dedicação e esperança.
    </p>
     <GaleriaCarousel :imagens="primeirosAnosImages" />

    <p>
      O que ninguém imaginava era que, já no dia seguinte, a procura cresceria tanto que os 7
      frangos preparados não foram suficientes. Vieram 15, depois 20, em seguida 24. O sucesso foi
      tão grande que logo foi preciso investir em mais máquinas: primeiro duas, depois três, até
      chegar a quatro no ano de 1996. Hoje, passadas três décadas, a La Casa Di Frango conta com 7
      máquinas, mantendo o mesmo compromisso de sempre: oferecer sabor, qualidade e união à mesa das
      famílias.
    </p>

    <p>
      Do valor inicial de R$15,00, que cabia no bolso de todos, até os R$55,00 de hoje, a essência
      não mudou. São 30 anos de história, tempero caseiro e muito carinho em cada frango servido –
      uma trajetória construída junto com a comunidade, que continua sendo parte dessa grande
      família chamada La Casa Di Frango.
    </p>

    <div class="section-title" id="tempos-recentes">
      <hr class="line" />
      <h1>Tempos Recentes</h1>
      <hr class="line" />
    </div>

    

    <p>
      Em 2025, a La Casa Di Frango celebra 31 anos de história. O que começou como um pequeno sonho
      em 1994, hoje se tornou uma tradição consolidada em Joinville. Atualmente, a casa funciona de
      quarta a domingo e feriados, atendendo no período da manhã e início da tarde, até a 1h da
      tarde, sempre oferecendo frangos assados preparados com o mesmo cuidado e sabor que marcaram
      sua origem.
    </p>
    <GaleriaCarousel :imagens="temposRecentesImages" />

    <p>
      O fundador Claudinei Bisewski continua à frente do negócio, agora com 48 anos, ao lado de seu
      pai Tomás Bisewski agora com 76 anos e de outros familiares. Mais do que um comércio, a La
      Casa Di Frango se transformou em uma empresa familiar, onde cada geração contribui para manter
      vivo o legado de dedicação, carinho e qualidade.
    </p>

    <p>
      Hoje, o empreendimento está muito mais estruturado do que no início. Conta com uma base sólida
      de clientes fiéis — muitos deles que já compram conosco há mais de três décadas, o que reforça
      a confiança e o sabor que atravessam gerações. A La Casa Di Frango é, acima de tudo, um
      símbolo de tradição, união familiar e compromisso com a qualidade.
    </p>
  </div>

  <img class="logo" :src="logoImg" alt="Logo La Casa Di Frango" />
</template>

<style scoped>
/* Seção de título estilizado */
.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin: 20px 0;
}

.section-title h1 {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: #154413; /* cor do site */
  margin: 0;
}

.section-title .line {
  flex: 1;
  height: 1px;
  background-color: #154413;
  opacity: 0.4;
}
p {
  text-align: justify;
  margin: 20px 15px;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

.logo {
  display: block;
  margin: 40px auto;
  width: 120px;
  height: auto;
}

/* Ajuste mobile */
@media (max-width: 480px) {
  .section-title h1 {
    font-size: 22px;
  }
}
</style>
