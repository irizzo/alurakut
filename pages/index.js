import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';

/* Components */
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


/* Profile Sidebar - Reutilizar */
function ProfileSidebar({ githubUser, ...props }) {
  return (
    <Box>
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
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

  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={githubUser} />
      </div>

      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">Bem vindo(a)</h1>
          <OrkutNostalgicIconSet />
        </Box>

      </div>

      <div vclassName="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Pessoas ({favouritePeople.length})</h2>
  
          <ul>
            {favouritePeople.map((item) => {
              return (
                <li>
                  <a href={`/users/${item}`} key={item}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <Box>
          Comunidades
        </Box>
      </div>
    </MainGrid>
    </>
  )
}
