import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { styled } from '@mui/material/styles';

import { Props } from 'types';
import { RootState } from 'redux/reduxStore';
// import {
//   useLazyGetUserByIdQuery
// } from 'services/volunteerHubApi';

import { GridContainer, GridItem } from 'components/Grid';

import profile from 'assets/images/kendall.jpg';
import profileBg from 'assets/images/profile-bg.jpg';
import { container } from 'assets/jss';
import {
  faceImg,
  profileDiv,
  imageDiv,
  main,
  mainRaised
} from 'assets/jss/pages/volunteerProfile';
import Parallax from 'components/Parallax';
import { AuthenticationContext } from 'context/Authentication';
import { Typography } from '@mui/material';

const VolunteerProfile: React.FC<Props> = () => {
  const { id } = useSelector((state: RootState) => state.myProfile);

  const {
    state: { user }
  } = React.useContext(AuthenticationContext);

  // const [getUserById, state] = useLazyGetUserByIdQuery();

  const ImgFace = styled('img')(() => (faceImg));
  const DivImage = styled('div')(() => (imageDiv));
  const DivProfile = styled('div')(() => (profileDiv));
  const DivContainer = styled('div')(() => (container));
  const DivMain = styled('div')(() => ({
    ...main,
    ...mainRaised
  }));

  useEffect(() => {
    // (
    // async () => {
    //   if (id) {
    // await getUserById({ id });
    // TODO: send to redux store
    //   }
    // }
    // )();
  }, []);

  return (
    <>
      <h3>
        <FormattedMessage id="myprofile.title" />
      </h3>
      <Parallax image={profileBg} />
      <DivMain>
        <div>
          <DivContainer>
            <GridContainer justifyContent="center">
              <GridItem>
                <DivProfile>
                  <DivImage>
                    <ImgFace src={profile} alt="..." />
                  </DivImage>
                  <div>
                    <Typography variant="h4">
                      {user?.firstName} {user?.lastName}
                    </Typography>
                    <h6>DESIGNER</h6>
                    {/* <Button justIcon link >
                <i className={"fab fa-twitter"} />
              </Button>
              <Button justIcon link>
                <i className={"fab fa-instagram"} />
              </Button>
              <Button justIcon link >
                <i className={"fab fa-facebook"} />
              </Button> */}
                  </div>
                  <div>
                    <p>
                      An artist of considerable range, Chet Faker — the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                      and records all of his own music, giving it a warm, intimate
                      feel with a solid groove structure.
                    </p>
                    <p>
                      An artist of considerable range, Chet Faker — the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                      and records all of his own music, giving it a warm, intimate
                      feel with a solid groove structure.
                    </p>
                    <p>
                      An artist of considerable range, Chet Faker — the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                      and records all of his own music, giving it a warm, intimate
                      feel with a solid groove structure.
                    </p>
                    <p>
                      An artist of considerable range, Chet Faker — the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                      and records all of his own music, giving it a warm, intimate
                      feel with a solid groove structure.
                    </p>
                  </div>
                </DivProfile>
              </GridItem>
            </GridContainer>
          </DivContainer>
        </div>
      </DivMain>
    </>
  );
};
export default React.memo(VolunteerProfile);