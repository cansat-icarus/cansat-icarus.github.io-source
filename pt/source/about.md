title: "Acerca"
layout: "page"
hidedate: true
---
### Quem somos nós?
<div id="about-pics" style="display: flex; flex-wrap: wrap; justify-content: space-around;">
  {% fancybox /assets/images/people/beatriz.jpg Ana Beatriz Vitória %}
  {% fancybox /assets/images/people/andre.jpg André Breda %}
  {% fancybox /assets/images/people/filipe.jpg Filipe Almeida %}
  {% fancybox /assets/images/people/ines.jpg Inês Lopes %}
  {% fancybox /assets/images/people/pjoaocera.jpg Prof. João Cera %}
  {% fancybox http://www.gravatar.com/avatar/?d=mm João Marques %}
  {% fancybox /assets/images/people/juliana.jpg Juliana Reis %}
  {% fancybox /assets/images/people/psandravieira.png Dra. Sandra Vieira %}
  {% fancybox /assets/images/people/ptaniacaetano.jpg Dra. Tânia Caetano %}
  {% fancybox /assets/images/people/vasco.jpg Vasco Silva %}
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    $('#about-pics').find('br').remove()
    $('#about-pics').find('img').css('width', '160px').css('height', '160px').css('margin', '1em')
  })
</script>
