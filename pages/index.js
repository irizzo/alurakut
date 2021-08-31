/* React Resources */ 
import React, { useState, useEffect } from 'react';
import nookies from 'nookies'
import jwt from 'jsonwebtoken'

/* Alurakut Lib */
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';

/* Components */
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar({ githubUser }) {
  return (
    // semanticamente é aside agora
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

export default function Home(props) {
  const githubUser = props.githubUser
  
  const favouritePeople = [
    'gabrielrizzo',
    'juunegreiros',
    'omariosouto',
    'peas',
    'marcobrunodev'
  ]
  const [communities, setCommunities] = useState([]);
 
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

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '31c0083dfb8539170dcb539f51be99',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }`})
    })
    .then((res) => res.json())
    .then((data) => {
      const bdCommunities = data.data.allCommunities
      setCommunities(bdCommunities)
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
            const newCommunity = {
              title: data.get('title'),
              imageUrl: data.get('imageUrl'),
              creatorSlug: githubUser
            }

            fetch('/api/communities', {
              method: 'POST',
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newCommunity)
            })
            .then(async (res) => {
              const data = await res.json;
              const createdCommunity = data.createdCommunity
              
              // spread do array COMMUNITIES
              const allCommunities = [...communities, createdCommunity]
              setCommunities(allCommunities)
            })
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
                name="imageUrl"
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
            {favouritePeople.map((p, index) => {
              if (index < 6) {
                return (
                  <li key={p}>
                    <a href={`https://github.com/${p}`}>
                        <img src={`https://github.com/${p}.png`} />
                        <span>{p}</span>
                      </a>
                  </li>
                )
              }
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Comunidades ({communities.length})</h2>
          <ul>
            {communities.map((community, index) => {
              if (index < 6) {
                return (
                  <li key={community.id}>
                    <a href={`/communities/${community.id}`}>
                        <img src={community.imageUrl} />
                        <span>{community.title}</span>
                      </a>
                  </li>
                )
              }
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Seguidores do Github ({followers.length})</h2>
          <ul>
            {followers.map((follower, index) => {
              if (index < 6) {
                return (
                  <li key={follower.login}>
                    <a href={`https://github.com/${follower.login}`}>
                        <img src={`https://github.com/${follower.login}.png`} />
                        <span>{follower.login}</span>
                      </a>
                  </li>
                )
              }
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('http://alurakut-irizzo.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((res) => res.json())

  if(!isAuthenticated) {
    console.log('isAuthenticated = false')
    
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    },
  }
} 