/* links
  https://api.github.com/users/irizzo
  https://dashboard.datocms.com/
*/

/* React Resources */ 
import React, { useState, useEffect } from 'react';

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
  
  const favouritePeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'marcobrunodev'
  ]
  const [communities, setCommunities] = useState([{
    id: '2021-07-13_22:10',
    name: 'Eu odeio acordar cedo',
    image: 'https://img10.orkut.br.com/community/4f114c4f15d34ddc5ef9f1e4c1b69768.png'
  }]);
 
  const [followers, setFollowers] = useState([])
  useEffect(() => {
    // Pegar o array de dados do github
    fetch(`https://api.github.com/users/${githubUser}/followers`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      setFollowers(data)
    })
    .catch((error) => {
      console.error(`Erro> ${error}`)
    })
  }, [])
  // o segundo parâmetro do useEffect serve para dizermos quando ele será executado. [] quer dizer 1 vez só, ao carregar a página.  

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
            {favouritePeople.map((p) => {
              return (
                <li key={p}>
                  <a href={`https://github.com/${p}`}>
                      <img src={`https://github.com/${p}.png`} />
                      <span>{p}</span>
                    </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Comunidades ({communities.length})</h2>
          <ul>
            {communities.map((community) => {
              return (
                <li key={community.id}>
                  <a>
                      <img src={community.image} />
                      <span>{community.name}</span>
                    </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Seguidores do Github ({followers.length})</h2>
          <ul>
            {/* TODO - colocar limite de 6 itens */}
            {followers.map((follower) => {
              return (
                <li key={follower.login}>
                  <a href={`https://github.com/${follower.login}`}>
                      <img src={`https://github.com/${follower.login}.png`} />
                      <span>{follower.login}</span>
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
