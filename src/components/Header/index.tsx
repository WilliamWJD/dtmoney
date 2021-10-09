import { Container, Content } from './styles';

import imgLogo from '../../assets/logo.svg';

function Header(){
    return(
        <Container>
            <Content>
                <img src={imgLogo} alt="dtmoney" />
                <button type="button">Nova transação</button>
            </Content>
        </Container>
    )
}

export { Header }