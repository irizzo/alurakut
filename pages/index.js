/* React Resources */ 
import React, { useState } from 'react';

/* Alurakut Lib */
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';

/* Components */
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar({ githubUser }) {
  return (
    // semanticamente é aside agora, 
    <Box as="aside">
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />

      <hr />
      
      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>

      <AlurakutProfileSidebarMenuDefault />
  </Box>
  )
}

export default function Home() {
  const githubUser = 'irizzo'

  const [communities, setCommunities] = useState([{
    id: '2021-07-13_22:10',
    name: 'Eu odeio acordar cedo',
    image: 'https://img10.orkut.br.com/community/4f114c4f15d34ddc5ef9f1e4c1b69768.png'
  }]);

  const favouritePeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'marcobrunodev'
  ]

  return (
    <>
    <AlurakutMenu githubUser={githubUser} />
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={githubUser} />
      </div>

      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">Bem vindo(a)</h1>
          <OrkutNostalgicIconSet />
        </Box>

        <Box>
          <h2 className="subtitle">O que você deseja fazer?</h2>

          <form onSubmit={(e) => {
            // tira o refresh padrão do Form
            e.preventDefault();

            const data = new FormData(e.target)

            // spread do array COMMUNITIES
            const newCommunities = [
              ...communities, 
              { id: new Date().toISOString, name: data.get('title'), image: data.get('image-url')}]
            setCommunities(newCommunities)
          }}
          >
            <div>
              <input
                placeholder="Qual vai ser o nome da sua cominidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua cominidade?"
                type="text"
              />
            </div>

            <div>
              <input
                placeholder="Coloque uma URL para usarmos de capa"
                name="image-url"
                aria-label="Coloque uma URL para usarmos de capa"
                type="url"
              />
            </div>

            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>

      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Pessoas ({favouritePeople.length})</h2>
  
          <ul>
            {favouritePeople.map((item) => {
              return (
                <li key={item}>
                  <a href={`/users/${item}`}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Comunidades ({communities.length})</h2>
          <ul>
            {communities.map((item) => {
              return (
                <li key={item.id}>
                  <a>
                      <img src={item.image} />
                      <span>{item.name}</span>
                    </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}
