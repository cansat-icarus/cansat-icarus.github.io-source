title: "Missão"
layout: "page"
hidedate: true
---
O CanSat Portugal é um projeto educativo da Agencia Espacial Europeia (ESA), organizado em Portugal pelo Centro AeroEspaço do Aeroclube de Torres Vedras em cooperação com a  Ciência Viva- Agência Nacional para a Cultura Científica e Tecnológica, com o objectivo de proporcionar aos estudantes Portugueses a primeira experiência em projetos relacionados com a tecnologia aeroespacial.

O CanSat em si (satélite em forma de lata) é um modelo funcional de um micro-satélite, em que todos os sistemas são integrados no volume de uma lata de refrigerante. É lançado por um foguetão até uma altitude previamente definida (1000 metros) para que durante a descida seja possível realizar uma experiência científica, captar os sinais emitidos (telemetria) e garantir uma aterragem segura.

Para mais informação acerca da competição visite [CanSat Portugal](http://cansatportugal.org/)
<small>Texto adaptado da página do projeto CanSat Portugal (link disponível acima)</small>

### Missão Primária
Os objetivos da missão primária estão fora do nosso controlo. Consiste em medir temperatura, pressão atmosférica e enviar esses registos preciosos para uma estação terrestre com frequência mínima de 1Hz (1 registo por segundo).

### Missão Secundária
Aqui é que tudo se torna interessante!
Vamos enviar duas espécies de bactéria dentro do satélite: *Ralstonia pickettii* e *Cupriavidius metallidurans*. Estas são isoladas com frequência em ambientes relacionados com a exploração espacial tais como espaços de construção de naves espaciais, superfícies de robôs e na Estação Espacial Internacional (ISS). Estas bactérias partilham genes relativos a resistência a metais pesados (HMR), formação de biofilme, motilidade e biosíntese de cobalamina. O nosso objetivo é determinar se estes genes específicos podem dar vantagem a bactérias em ambientes hostis com mudanças repentinas em propriedades químicas e físicas: aceleração (movimentos repentinos), temperatura e concentração de oxigénio. Isto tem potenciais aplicações em astrobiologia e na [panspermia](https://pt.wikipedia.org/wiki/Panspermia).

Adicionalmente, pretendemos desenvolver um sistema de posição idêntico ao GPS, mas ao contrário: o satélite emite uma sinal com uma frequência bem definida e as estações terrestres registam os dados necessários para determinar a posição do satélite. Os resultados serão comparados a um receptor GPS normal dentro da lata, que também ajudará na sua recuperação.

Para além disso, planeamos adicionar um método de controlo remoto do satélite. Desde uma estação base, sempre que o satélite esteja ligado e dentro de alcance, será possível controlar a frequência de envio de dados e ligar/desligar várias partes do sistema para poder poupar eletricidade e o tempo alocado a essas rotinas no processador (o microcontrolador tem os seus limites).

### Design
A lata em si será impressa numa impressora 3D (Os modelos serão disponibilizados quando terminados) e dentro dela vai conter o microcontrolador (ATmega 2560 com o *bootloader* do Arduino) e o transceiver na parte inferior. Por cima, estarão as duas placas de sensores, colocadas na vertical, e no meio delas os microtubos que contêm as bactérias.

As duas placas de sensores são exatamente iguais para assegurar redundância total nos sensores, e ligam-se ao microcontrolador por um único cabo para que sejam fáceis de remover e colocar: é só desligar o cabo e deslizá-las para fora!
