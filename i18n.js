/* Shared PT-BR / English translations for the portfolio. */
(() => {
  const STORAGE_KEY = 'portfolio-language';
  const ENGLISH = 'en';
  const PORTUGUESE = 'pt-BR';

  const en = {
    /* Navigation and shared interface */
    'PORTFÓLIO': 'PORTFOLIO',
    'Portfólio': 'Portfolio',
    'Kauã Puttin Pestana | Portfólio': 'Kauã Puttin Pestana | Portfolio',
    'Portfólio | Kauã Puttin Pestana': 'Portfolio | Kauã Puttin Pestana',
    'desenvolvedor web, frontend, backend, python, javascript, freelance, portfólio': 'web developer, frontend, backend, python, javascript, freelance, portfolio',
    'Início': 'Home',
    'Habilidades': 'Skills',
    'Projetos': 'Projects',
    'Jornada': 'Journey',
    'Certificados': 'Certificates',
    'Sobre': 'About',
    'Contato': 'Contact',
    'Topo': 'Top',
    'Tema:': 'Theme:',
    'Claro': 'Light',
    'Escuro': 'Dark',
    'Alternar tema': 'Toggle theme',
    'Ícone de sol': 'Sun icon',
    'Ícone de lua': 'Moon icon',
    'Abrir menu': 'Open menu',
    'Fechar menu': 'Close menu',
    'Ir para o início': 'Go to home',
    'Preferências': 'Preferences',
    'Mudar idioma para inglês': 'Switch language to English',
    'Mudar idioma para português': 'Switch language to Portuguese',

    /* Hero */
    'Olá, sou o': "Hi, I'm",
    'Desenvolvedor Web - UX/UI - Python - ADS': 'Web Developer - UX/UI - Python - Systems Analysis and Development',
    'Desenvolvo interfaces digitais e soluções web focadas em otimizar processos, fortalecer a presença digital e criar sistemas que aumentam a eficiência, organização e resultados das empresas.': 'I build digital interfaces and web solutions focused on optimizing processes, strengthening digital presence, and creating systems that improve business efficiency, organization, and results.',
    'Ver projetos →': 'View projects →',
    '⌵ Download CV': '⌵ Download résumé',
    'Redes sociais': 'Social networks',
    'Foto de Kauã': 'Photo of Kauã',

    /* Skills */
    'Tecnologias': 'Technologies',
    'Minhas habilidades': 'My skills',
    'Tecnologias que utilizo para transformar ideias em soluções digitais funcionais, intuitivas e bem construídas.': 'Technologies I use to turn ideas into functional, intuitive, and well-crafted digital solutions.',
    'Front-end': 'Front-end',
    'Interfaces responsivas, acessíveis e modernas, com atenção à experiência de quem utiliza.': 'Responsive, accessible, and modern interfaces designed with careful attention to user experience.',
    'Back-end & dados': 'Back-end & data',
    'Desenvolvimento de lógica, automações e soluções para armazenar e organizar dados.': 'Logic, automation, and solutions for storing and organizing data.',
    'UI/UX & design': 'UI/UX & design',
    'Protótipos, identidades visuais e experiências digitais intuitivas e consistentes.': 'Prototypes, visual identities, and intuitive, consistent digital experiences.',
    'Ferramentas': 'Tools',
    'Versionamento, colaboração e organização para manter o desenvolvimento produtivo.': 'Version control, collaboration, and organization for a productive development workflow.',
    'Uso frequente': 'Frequent use',
    'Em evolução': 'Currently learning',
    'Ver habilidades aplicadas nos projetos': 'See skills applied in projects',
    'Tecnologias de front-end': 'Front-end technologies',
    'Tecnologias de back-end e dados': 'Back-end and data technologies',
    'Ferramentas de design': 'Design tools',
    'Ferramentas de desenvolvimento': 'Development tools',

    /* Projects */
    'Meus Projetos': 'My Projects',
    'Uma seleção de projetos que mostram minha evolução como desenvolvedor. Clique em um card para conhecer os detalhes.': 'A selection of projects that show my growth as a developer. Select a card to explore the details.',
    'Protótipo Fortes Engenharia': 'Fortes Engenharia Prototype',
    'Protótipo APP NutriFit': 'NutriFit App Prototype',
    'Protótipo App NutriFit': 'NutriFit App Prototype',
    'Site MãoCerta': 'MãoCerta Website',
    'Gerador de Senhas': 'Password Generator',
    'Gerenciador de Pedidos': 'Order Manager',
    'Jogo Ping-Pong': 'Ping-Pong Game',
    'Site Portfólio': 'Portfolio Website',
    'Equipe': 'Team',
    'Aplicação web': 'Web application',
    'Jogo multiplayer': 'Multiplayer game',
    'Jogo web': 'Web game',
    'Portfólio pessoal desenvolvido para apresentar projetos, habilidades, experiências e formas de contato.': 'Personal portfolio built to present projects, skills, experiences, and contact options.',
    'Protótipo de site institucional para uma empresa de engenharia, com design responsivo e seções de serviços, projetos e contato.': 'Institutional website prototype for an engineering company, featuring responsive design and sections for services, projects, and contact.',
    'Protótipo de aplicativo mobile para acompanhamento de dieta, registro de refeições, macros e metas nutricionais.': 'Mobile app prototype for tracking diets, meals, macros, and nutrition goals.',
    'Aplicação web que conecta clientes a profissionais próximos, com cadastro e fluxos para contratar ou oferecer serviços.': 'Web application that connects customers with nearby professionals, including registration and flows to hire or offer services.',
    'Aplicação para geração de senhas seguras, com opções de personalização e critérios de complexidade.': 'Application for generating secure passwords with customization options and complexity rules.',
    'Sistema web para gerenciamento de pedidos, clientes e pagamentos, com geração de resumos e organização do fluxo de vendas.': 'Web system for managing orders, customers, and payments, with summaries and an organized sales workflow.',
    'Jogo web multiplayer do impostor, com tema do jogo Clash Royale, salas em tempo real, votação por rodada e cartas secretas.': 'Multiplayer impostor web game inspired by Clash Royale, with real-time rooms, round voting, and secret cards.',
    'Jogo de ping-pong no navegador, com modo para 1 ou 2 jogadores': 'Browser-based ping-pong game with one- or two-player modes',
    'Ver mais projetos →': 'View more projects →',
    'Ver menos projetos ↑': 'View fewer projects ↑',
    'Ver detalhes do Protótipo Fortes Engenharia': 'View Fortes Engenharia Prototype details',
    'Ver detalhes do Protótipo APP NutriFit': 'View NutriFit App Prototype details',
    'Ver detalhes do projeto MãoCerta': 'View MãoCerta project details',
    'Ver detalhes do projeto Gerador de Senhas': 'View Password Generator project details',
    'Ver detalhes do Gerenciador de Pedidos': 'View Order Manager details',
    'Ver detalhes do projeto Spyfall Clash': 'View Spyfall Clash project details',
    'Ver detalhes do Jogo Ping-Pong': 'View Ping-Pong Game details',
    'Ver detalhes do Site Portfólio': 'View Portfolio Website details',
    'Projeto': 'Project',
    'Tipo': 'Type',
    'Website': 'Website',
    'Stack': 'Stack',
    'Visitar': 'Visit',
    'Abrir protótipo': 'Open prototype',
    'Protótipo': 'Prototype',
    'Protótipo interativo': 'Interactive prototype',
    'Protótipo no Figma': 'Figma prototype',
    'Fechar detalhes do projeto': 'Close project details',
    'Fechar interface do protótipo': 'Close prototype interface',
    'Projeto digital': 'Digital project',

    /* Journey cards */
    'Experiências': 'Experiences',
    'Minha Jornada': 'My Journey',
    'Experiências práticas que ampliaram minha formação, minha conexão com empresas e minha participação na comunidade de tecnologia.': 'Hands-on experiences that expanded my education, my connection with companies, and my participation in the technology community.',
    'Desafio acadêmico': 'Academic challenge',
    'Desafio Fortes Engenharia': 'Fortes Engenharia Challenge',
    'Melhor projeto da turma': 'Best project in the class',
    'Desenvolvimento de um protótipo web para a Fortes Engenharia. O projeto foi destaque da turma e apresentado no Base27 para lideranças da empresa.': 'Development of a web prototype for Fortes Engenharia. The project stood out in class and was presented at Base27 to company leaders.',
    'Projeto acadêmico aproximado de um problema real de mercado': 'Academic project built around a real-world business challenge',
    'Desenvolvimento Web': 'Web Development',
    'Prototipação': 'Prototyping',
    'Trabalho em equipe': 'Teamwork',
    'Conhecer experiência': 'Explore experience',
    'São Paulo · CPBR16': 'São Paulo · CPBR16',
    '9–14 jul 2024': 'Jul 9–14, 2024',
    'Imersão em palestras, estandes, robótica, drones, eSports e experiências voltadas à inovação e à tecnologia, em uma viagem proporcionada pela UVV.': 'An immersive trip featuring talks, exhibits, robotics, drones, eSports, and experiences centered on innovation and technology, provided by UVV.',
    'Palestras · Robótica · IA · Drones · eSports · Inovação': 'Talks · Robotics · AI · Drones · eSports · Innovation',
    'Tecnologia e inovação': 'Technology and innovation',
    'Inteligência Artificial': 'Artificial Intelligence',
    'UVV · Vila Velha/ES': 'UVV · Vila Velha, ES',
    '04 ago 2026': 'Aug 4, 2026',
    'Organização': 'Organization',
    'Organização de eventos': 'Event organization',
    'Liderança': 'Leadership',
    'Comunicação': 'Communication',
    'Organização do TI 360 na UVV, conectando palestras, oficinas, empresas e estudantes em um evento voltado à tecnologia, inovação e mercado.': 'Organization of TI 360 at UVV, connecting talks, workshops, companies, and students in an event focused on technology, innovation, and the job market.',
    'Planejamento e execução junto à Atlética Tubarões UVV': 'Planning and execution with Atlética Tubarões UVV',

    /* Certificates */
    'Licenças e certificados': 'Licenses and certificates',
    'Cursos, participações e extensões que fortalecem minha formação em tecnologia, inovação e desenvolvimento.': 'Courses, events, and extension programs that strengthen my education in technology, innovation, and development.',
    'Ouvinte Palestra “IA na Prática”': 'Attendee — “AI in Practice” Talk',
    'Programando com ChatGPT': 'Programming with ChatGPT',
    'Curso Database Foundations': 'Database Foundations Course',
    'Certificado Programa Base Científica': 'Base Científica Program Certificate',
    'Visita Técnica à 16ª Campus Party Brasil': 'Technical Visit to the 16th Campus Party Brasil',
    'Apresentador do Pitch no “INOVAAPPS”': 'Pitch Presenter at “INOVAAPPS”',
    'Expositor no evento Expoinova': 'Exhibitor at Expoinova',
    'Certificado de palestra': 'Talk certificate',
    'Certificado de participação': 'Participation certificate',
    'Certificado de conclusão': 'Completion certificate',
    'Certificado de apresentação': 'Presentation certificate',
    'Certificado de exposição': 'Exhibitor certificate',
    'Participação em palestra sobre uso prático de inteligência artificial no contexto acadêmico e profissional.': 'Participation in a talk about practical uses of artificial intelligence in academic and professional settings.',
    'Participação em atividade sobre programação com ChatGPT e aplicações práticas de IA no desenvolvimento.': 'Participation in an activity about programming with ChatGPT and practical AI applications in development.',
    'Conclusão satisfatória do exame final do curso Database Foundations da Oracle Academy.': 'Successful completion of the Oracle Academy Database Foundations final exam.',
    'Projeto para desenvolvimento de soluções proposto pela Fortes Engenharia, realizado pela Base27.': 'Solution-development project proposed by Fortes Engenharia and carried out by Base27.',
    'Vivência técnica em evento de tecnologia em São Paulo, promovida pela UVV, sobre inovação, comunidades digitais e experiências práticas.': 'Technical experience at a technology event in São Paulo, promoted by UVV, covering innovation, digital communities, and hands-on activities.',
    'Apresentação do projeto AI Facilites: For Best Generation durante a Inovaweek 2025.': 'Presentation of the AI Facilites: For Best Generation project during Inovaweek 2025.',
    'Participação como expositor apresentando o projeto AI Facilites: For Best Generation durante a Inovaweek 2025.': 'Participation as an exhibitor presenting the AI Facilites: For Best Generation project during Inovaweek 2025.',
    'Aplicações práticas': 'Practical applications',
    'Ciência da Computação': 'Computer Science',
    'Banco de dados': 'Databases',
    'Modelagem': 'Modeling',
    'Resolução de problemas': 'Problem solving',
    'Computação': 'Computing',
    'Tecnologia': 'Technology',
    'Inovação': 'Innovation',
    'Comunidade': 'Community',
    'Exposição': 'Exhibition',
    'Inovação tecnológica': 'Technological innovation',
    'abr 2024': 'Apr 2024',
    'mai 2024': 'May 2024',
    'jun 2024': 'Jun 2024',
    'jul 2024': 'Jul 2024',
    'set 2025': 'Sep 2025',
    'Ver mais certificados →': 'View more certificates →',
    'Ver menos certificados ↑': 'View fewer certificates ↑',
    'Mostrar detalhes do certificado': 'Show certificate details',
    'Recolher detalhes do certificado': 'Hide certificate details',

    /* About */
    'Sobre mim': 'About me',
    'Me chamo': 'My name is',
    ', estou cursando de Ciência da Computação na Universidade Vila Velha (UVV), com previa de conclusão para dezembro de 2027, tenho conhecimentos em': ', and I am studying Computer Science at Universidade Vila Velha (UVV), with expected graduation in December 2027. I have knowledge of',
    'Front-end, Python, MySQL, lógica de programação e design': 'Front-end, Python, MySQL, programming logic, and design',
    'Possuo interesse em': 'I am interested in',
    'desenvolvimento de sistemas, design de interfaces e soluções tecnológicas': 'systems development, interface design, and technology solutions',
    'que facilitem o dia a dia das pessoas.': 'that make people’s daily lives easier.',
    'Tenho perfil proativo, facilidade de aprendizado e gosto de enfrentar novos desafios, sempre buscando evoluir tanto tecnicamente quanto profissionalmente. Também possuo experiência com': 'I am proactive, learn quickly, and enjoy taking on new challenges while continuously growing both technically and professionally. I also have experience with',
    'criação de conteúdo digital': 'digital content creation',
    'atuação no comércio online': 'online commerce',
    ', o que contribuiu para o desenvolvimento de habilidades como': ', which helped me develop skills such as',
    'organização, comunicação e visão de negócio.': 'organization, communication, and business awareness.',
    'Busco oportunidades que me permitam aplicar meus conhecimentos na prática, adquirir experiência e crescer na área de tecnologia.': 'I am looking for opportunities to apply my knowledge, gain hands-on experience, and grow in the technology field.',
    'e': 'and',
    'Inglês Básico': 'Basic English',
    'Vila Velha-ES': 'Vila Velha, ES',

    /* Contact and footer */
    'Vamos conversar?': "Let's talk?",
    'Aberto a projetos freelance, oportunidades CLT e colaborações.': 'Open to freelance projects, full-time opportunities, and collaborations.',
    'Tem um projeto em mente ou está procurando um dev para sua equipe? Entre em contato — será um prazer conversar.': 'Have a project in mind or need a developer for your team? Get in touch — I would be happy to talk.',
    'Como deseja enviar?': 'How would you like to send it?',
    'Nome': 'Name',
    'Assunto': 'Subject',
    'Mensagem': 'Message',
    'Seu nome': 'Your name',
    'seuemail@exemplo.com': 'yourname@example.com',
    'Ex: Projeto freelance, proposta de emprego...': 'Example: Freelance project, job opportunity...',
    'Conte um pouco sobre seu projeto ou oportunidade...': 'Tell me a little about your project or opportunity...',
    'Enviar →': 'Send →',
    'Enviar pelo WhatsApp →': 'Send via WhatsApp →',
    'Enviar pelo Gmail →': 'Send via Gmail →',
    'Abrindo WhatsApp...': 'Opening WhatsApp...',
    'Abrindo Gmail...': 'Opening Gmail...',
    'Contato pelo portfólio': 'Portfolio contact',
    'WhatsApp aberto. Agora é só confirmar o envio da mensagem.': 'WhatsApp opened. Now confirm to send your message.',
    'Gmail aberto. Agora é só confirmar o envio da mensagem.': 'Gmail opened. Now confirm to send your message.',
    'Enviar e-mail para Kauã': 'Send Kauã an email',
    'Acessar GitHub de Kauã': "Open Kauã's GitHub",
    'Acessar LinkedIn de Kauã': "Open Kauã's LinkedIn",
    'Conversar com Kauã pelo WhatsApp': 'Chat with Kauã on WhatsApp',
    '· Todos os direitos reservados.': '· All rights reserved.',

    /* Shared journey detail interface */
    'Voltar para Minha Jornada': 'Back to My Journey',
    'Voltar para a página principal': 'Back to the main page',
    'Informações': 'Information',
    'Registros': 'Highlights',
    'Galeria do projeto': 'Project gallery',
    'Galeria do evento': 'Event gallery',
    'Próxima experiência': 'Next experience',
    'Continuar explorando': 'Continue exploring',
    '© Kauã Puttin · Minha Jornada': '© Kauã Puttin · My Journey',
    'Data': 'Date',
    'Local': 'Location',
    'Evento': 'Event',
    'Participação': 'Participation',
    'Papel': 'Role',
    'Promoção': 'Hosted by',

    /* Fortes detail */
    'Desafio Fortes Engenharia | Jornada de Kauã': "Fortes Engenharia Challenge | Kauã's Journey",
    'Desafio acadêmico · Fortes Engenharia': 'Academic challenge · Fortes Engenharia',
    'Em um desafio acadêmico ligado à Fortes Engenharia, meu grupo desenvolveu um protótipo web para apoiar a gestão e o monitoramento de processos da empresa.': 'In an academic challenge connected to Fortes Engenharia, my team developed a web prototype to support the management and monitoring of company processes.',
    'Sobre a experiência': 'About the experience',
    'Contexto': 'Context',
    'Em um trabalho acadêmico realizado em grupo, recebemos um desafio real ligado à Fortes Engenharia. A proposta era criar um protótipo de site ou sistema que ajudasse a empresa a acompanhar e monitorar informações e processos internos.': 'As part of a group academic project, we received a real challenge connected to Fortes Engenharia. The goal was to create a website or system prototype that could help the company track and monitor internal information and processes.',
    'Minha participação': 'My contribution',
    'Participei com o grupo do desenvolvimento e da apresentação do protótipo, contribuindo para transformar o problema apresentado em uma solução web clara, funcional e alinhada ao contexto da empresa.': 'I worked with the team on developing and presenting the prototype, helping turn the proposed problem into a clear, functional web solution aligned with the company’s context.',
    'Resultado e aprendizados': 'Outcome and lessons learned',
    'O projeto foi considerado o melhor da turma. Fomos convidados a apresentá-lo no Base27 para lideranças da Fortes Engenharia e recebemos um retorno muito positivo. A experiência aproximou o ambiente acadêmico de um problema real de mercado e fortaleceu meus aprendizados sobre colaboração, prototipação e apresentação de soluções.': 'The project was selected as the best in the class. We were invited to present it at Base27 to Fortes Engenharia leaders and received very positive feedback. The experience connected academic work with a real business challenge and strengthened my skills in collaboration, prototyping, and solution presentation.',
    'Desafio acadêmico em grupo': 'Group academic challenge',
    'Melhor projeto': 'Best project',
    'Destaque': 'Highlight',
    'Apresentação': 'Presentation',
    'Registros da equipe, da apresentação no Base27 e do protótipo desenvolvido.': 'Photos of the team, the Base27 presentation, and the developed prototype.',
    'Equipe no Base27': 'Team at Base27',
    'Foto da equipe': 'Team photo',
    'Apresentação do protótipo': 'Prototype presentation',
    'Protótipo desenvolvido': 'Developed prototype',
    'Campus Party São Paulo': 'Campus Party São Paulo',

    /* Campus Party detail */
    'Campus Party Brasil 2024 | Jornada de Kauã': "Campus Party Brasil 2024 | Kauã's Journey",
    'São Paulo · 9–14 de julho de 2024': 'São Paulo · July 9–14, 2024',
    'Em 2024, participei da 16ª Campus Party Brasil em São Paulo por meio de uma viagem proporcionada pela Universidade Vila Velha.': 'In 2024, I attended the 16th Campus Party Brasil in São Paulo through a trip provided by Universidade Vila Velha.',
    'Foram dias de imersão em tecnologia e inovação no Expo Center Norte, explorando estandes, projetos, comunidades, palestras, workshops, hackathons e experiências interativas.': 'It was an immersive experience in technology and innovation at Expo Center Norte, exploring exhibits, projects, communities, talks, workshops, hackathons, and interactive experiences.',
    'O que acompanhei': 'What I experienced',
    'Acompanhei conteúdos e demonstrações sobre inteligência artificial, ciência, carreira, mercado e transformação digital, além de robótica, batalhas de robôs, drones, eSports, games, projetos estudantis e impressão 3D. Entre as palestras que acompanhei pessoalmente estiveram apresentações de Pyong Lee e Domingos dos Santos.': 'I attended talks and demonstrations about artificial intelligence, science, careers, business, and digital transformation, as well as robotics, robot battles, drones, eSports, games, student projects, and 3D printing. Talks I attended in person included presentations by Pyong Lee and Domingos dos Santos.',
    'Principais aprendizados': 'Key takeaways',
    'A experiência ampliou minha visão sobre tecnologia, criatividade e mercado, além de proporcionar contato com diferentes comunidades e formas de transformar conhecimento em projetos práticos.': 'The experience broadened my perspective on technology, creativity, and business while connecting me with different communities and ways to turn knowledge into practical projects.',
    '16ª Campus Party Brasil': '16th Campus Party Brasil',
    '9 a 14 de julho de 2024': 'July 9–14, 2024',
    'Expo Center Norte · São Paulo/SP': 'Expo Center Norte · São Paulo, SP',
    'Viagem proporcionada pela UVV': 'Trip provided by UVV',
    'Conteúdo e inovação': 'Content and innovation',
    'Cultura digital': 'Digital culture',
    'Empreendedorismo': 'Entrepreneurship',
    'Registros dos palcos, palestras, estudantes e momentos marcantes da viagem.': 'Photos of stages, talks, students, and memorable moments from the trip.',
    'Grupo da UVV': 'UVV group',
    'Palestra Pyong Lee': 'Pyong Lee talk',
    'Painel no Palco Inova': 'Panel at Palco Inova',
    'Equipe na Campus Party': 'Team at Campus Party',
    'Selfie com Pyong Lee': 'Selfie with Pyong Lee',
    'Foto com Gustavo Guanabara': 'Photo with Gustavo Guanabara',

    /* TI 360 detail */
    'TI 360 | Jornada de Kauã': "TI 360 | Kauã's Journey",
    'UVV · 4 de agosto de 2026': 'UVV · August 4, 2026',
    'Participei da organização do TI 360, evento promovido pela Atlética Tubarões UVV para aproximar estudantes, profissionais e empresas de tecnologia.': 'I helped organize TI 360, an event hosted by Atlética Tubarões UVV to connect students, professionals, and technology companies.',
    'Sobre o evento': 'About the event',
    'O TI 360 foi realizado na Universidade Vila Velha em 4 de agosto de 2026, reunindo palestras no Cineteatro, oficinas práticas em laboratórios, networking e conteúdos sobre tecnologia, inteligência artificial, desenvolvimento de software, inovação e mercado de trabalho.': 'TI 360 took place at Universidade Vila Velha on August 4, 2026, bringing together talks in the Cineteatro, hands-on lab workshops, networking, and content about technology, artificial intelligence, software development, innovation, and the job market.',
    'Atuei junto à equipe no planejamento e na execução do evento, apoiando a programação de palestras e oficinas, a comunicação com palestrantes, parceiros e patrocinadores, a divulgação, os cronogramas e o acompanhamento das atividades no dia.': 'I worked with the team on planning and delivering the event, supporting the talk and workshop schedule, communication with speakers, partners, and sponsors, promotion, timelines, and on-site activity coordination.',
    'Programação e conexões': 'Program and connections',
    'A programação contou com Karol Tognere, Talita, gerente de projetos da TOTVS, Leonardo, gestor da área de serviços da TOTVS, Hugo de Oliveira, Deivid Bolsoni, Akylys Rutsaz e Eliemar Junior. Entre os conteúdos apresentados esteve “ERP – o software que movimenta empresas”. A experiência fortaleceu meus aprendizados sobre liderança, comunicação, gestão e organização de eventos.': 'The program featured Karol Tognere; Talita, a project manager at TOTVS; Leonardo, a service area manager at TOTVS; Hugo de Oliveira; Deivid Bolsoni; Akylys Rutsaz; and Eliemar Junior. One of the topics presented was “ERP — the software that powers businesses.” The experience strengthened my skills in leadership, communication, management, and event organization.',
    'Atlética Tubarões UVV': 'Atlética Tubarões UVV',
    '4 de agosto de 2026': 'August 4, 2026',
    'Gestão': 'Management',
    'Registros das oficinas, palestras, convidados e principais momentos do TI 360.': 'Photos of workshops, talks, guests, and key moments from TI 360.',
    'Equipe e palestrante': 'Team and speaker',
    'Oficina em laboratório': 'Lab workshop',
    'Conexão com palestrantes': 'Connecting with speakers',
    'Organização e convidados': 'Organizers and guests',
    'Equipe e convidados': 'Team and guests',
    'Troca com profissionais': 'Exchange with professionals',
    'Momentos do evento': 'Event moments',
    'Organização e palestrantes': 'Organizers and speakers',
    'Organização e palestrante no Cineteatro da UVV durante o TI 360.': 'Organizers and a speaker at the UVV Cineteatro during TI 360.',

    /* Image descriptions */
    'Equipe do projeto da Fortes Engenharia no Base27': 'Fortes Engenharia project team at Base27',
    'Grupo de estudantes da UVV na Campus Party Brasil 2024': 'Group of UVV students at Campus Party Brasil 2024',
    'Participantes de uma oficina do TI 360 na UVV': 'Participants in a TI 360 workshop at UVV',
    'Equipe em frente ao Base27': 'Team outside Base27',
    'Equipe reunida dentro do Base27': 'Team gathered inside Base27',
    'Tela do protótipo desenvolvido para a Fortes Engenharia': 'Screen from the prototype developed for Fortes Engenharia',
    'Tela do protótipo Fortes Engenharia': 'Fortes Engenharia prototype screen',
    'Tela do protótipo NutriFit': 'NutriFit prototype screen',
    'Tela da aplicação MãoCerta': 'MãoCerta application screen',
    'Tela do Gerador de Senhas': 'Password Generator screen',
    'Tela do Gerenciador de Pedidos': 'Order Manager screen',
    'Tela do jogo Spyfall Clash': 'Spyfall Clash game screen',
    'Tela do Jogo Ping-Pong': 'Ping-Pong Game screen',
    'Tela do Site Portfólio': 'Portfolio Website screen',
    'Grupo da UVV reunido na Campus Party Brasil': 'UVV group gathered at Campus Party Brasil',
    'Estudantes da UVV durante a Campus Party': 'UVV students during Campus Party',
    'Estudantes da UVV reunidos na Campus Party': 'UVV students gathered at Campus Party',
    'foto com pyong lee': 'Photo with Pyong Lee',
    'Palestra na Arena Disrupção da CPBR16': 'Talk at the CPBR16 Arena Disrupção',
    'Público acompanhando um painel no Palco Inova': 'Audience watching a panel at Palco Inova',
    'Público acompanhando uma apresentação na Campus Party': 'Audience watching a presentation at Campus Party',
    'Organizadores e palestrante no Cineteatro da UVV durante o TI 360': 'Organizers and a speaker at the UVV Cineteatro during TI 360',
    'Organizadores e palestrante no palco do TI 360': 'Organizers and speaker on the TI 360 stage',
    'Participantes reunidos durante uma oficina do TI 360': 'Participants gathered during a TI 360 workshop',
    'Registro com palestrante diante da identidade do TI 360': 'Photo with a speaker in front of the TI 360 branding',
    'Organizadores reunidos com um convidado no palco': 'Organizers with a guest on stage',
    'Equipe e convidados reunidos no TI 360': 'Team and guests gathered at TI 360',
    'Registro de palestrante e organização durante o TI 360': 'Speaker and organizers during TI 360',
    'Momento registrado durante o evento TI 360': 'Moment captured during TI 360',
    'Organizadores reunidos com um palestrante do TI 360': 'Organizers with a TI 360 speaker',

    /* Accessibility labels */
    'Carrossel de fotos do projeto Fortes Engenharia': 'Fortes Engenharia project photo carousel',
    'Carrossel de fotos da Campus Party Brasil 2024': 'Campus Party Brasil 2024 photo carousel',
    'Carrossel de fotos do TI 360': 'TI 360 photo carousel',
    'Informações do projeto': 'Project information',
    'Informações do evento': 'Event information',
    'Conhecer minha experiência no projeto da Fortes Engenharia': 'Explore my experience with the Fortes Engenharia project',
    'Conhecer minha experiência na Campus Party São Paulo': 'Explore my Campus Party São Paulo experience',
    'Conhecer minha experiência na organização do TI 360': 'Explore my experience organizing TI 360',
    'Experiência de Kauã em um desafio acadêmico ligado à Fortes Engenharia e apresentado no Base27.': "Kauã's experience in an academic challenge connected to Fortes Engenharia and presented at Base27.",
    'Experiência de Kauã na 16ª Campus Party Brasil, em São Paulo.': "Kauã's experience at the 16th Campus Party Brasil in São Paulo.",
    'Experiência de Kauã na organização do evento TI 360.': "Kauã's experience organizing the TI 360 event.",
    'Portfólio de Kauã — Desenvolvedor Web especializado em HTML, CSS, JavaScript e Python.': "Kauã's portfolio — Web Developer specializing in HTML, CSS, JavaScript, and Python.",
    'Criando experiências digitais modernas com código limpo e design intencional.': 'Creating modern digital experiences with clean code and intentional design.'
  };

  const translatableAttributes = [
    'alt',
    'aria-label',
    'title',
    'placeholder',
    'content',
    'data-project-title',
    'data-project-description',
    'data-project-type',
    'data-project-platform'
  ];

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  let currentLanguage = PORTUGUESE;

  function normalize(value) {
    return String(value || '').trim().replace(/\s+/g, ' ');
  }

  function t(value, language = currentLanguage) {
    if (language !== ENGLISH) return value;
    return en[normalize(value)] || value;
  }

  function translateTextNode(node) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue || '');
    const source = originalText.get(node) || '';

    if (currentLanguage !== ENGLISH) {
      if (node.nodeValue !== source) node.nodeValue = source;
      return;
    }

    const key = normalize(source);
    const translated = en[key];
    if (!translated) return;

    const leading = source.match(/^\s*/)?.[0] || '';
    const trailing = source.match(/\s*$/)?.[0] || '';
    const nextValue = `${leading}${translated}${trailing}`;
    if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
  }

  function translateAttribute(element, attribute) {
    if (!element.hasAttribute(attribute)) return;

    let stored = originalAttributes.get(element);
    if (!stored) {
      stored = new Map();
      originalAttributes.set(element, stored);
    }
    if (!stored.has(attribute)) stored.set(attribute, element.getAttribute(attribute) || '');

    const source = stored.get(attribute) || '';
    const nextValue = currentLanguage === ENGLISH ? t(source, ENGLISH) : source;
    if (element.getAttribute(attribute) !== nextValue) element.setAttribute(attribute, nextValue);
  }

  function translateElementAttributes(element) {
    translatableAttributes.forEach((attribute) => translateAttribute(element, attribute));
  }

  function translateTree(root = document.body) {
    if (!root) return;

    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root);
      return;
    }

    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;

    if (root.nodeType === Node.ELEMENT_NODE) translateElementAttributes(root);
    root.querySelectorAll?.('*').forEach(translateElementAttributes);

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const tag = node.parentElement?.tagName;
        return tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT'
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      }
    });

    let node = walker.nextNode();
    while (node) {
      translateTextNode(node);
      node = walker.nextNode();
    }
  }

  function updateLanguageControls() {
    const isEnglish = currentLanguage === ENGLISH;
    document.querySelectorAll('[data-language-toggle]').forEach((button) => {
      button.textContent = isEnglish ? 'US' : 'BR';
      const label = isEnglish ? 'Switch language to Portuguese' : 'Mudar idioma para inglês';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
    });
  }

  function setLanguage(language, { persist = true, announce = true } = {}) {
    currentLanguage = language === ENGLISH ? ENGLISH : PORTUGUESE;
    document.documentElement.lang = currentLanguage;
    document.documentElement.dataset.language = currentLanguage === ENGLISH ? 'us' : 'br';
    translateTree(document.documentElement);
    updateLanguageControls();

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, currentLanguage);
      } catch {}
    }

    if (announce) {
      window.dispatchEvent(new CustomEvent('portfolio:languagechange', {
        detail: { language: currentLanguage }
      }));
    }
  }

  function toggleLanguage() {
    setLanguage(currentLanguage === ENGLISH ? PORTUGUESE : ENGLISH);
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest?.('[data-language-toggle]');
    if (button) toggleLanguage();
  });

  const observer = new MutationObserver((mutations) => {
    if (currentLanguage !== ENGLISH) return;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => translateTree(node));
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  window.portfolioI18n = {
    get language() {
      return currentLanguage;
    },
    setLanguage,
    toggleLanguage,
    t
  };

  let savedLanguage = PORTUGUESE;
  try {
    const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
    savedLanguage = requestedLanguage === ENGLISH
      ? ENGLISH
      : localStorage.getItem(STORAGE_KEY) === ENGLISH
        ? ENGLISH
        : PORTUGUESE;
  } catch {}
  setLanguage(savedLanguage, { persist: false, announce: false });
})();
