import { Container, CssBaseline, ThemeProvider } from "@mui/material"
import MenuBar from "./components/MenuBar"
import theme from "../common/utils/CustomTheme"
import { spacingNormal } from "../common/utils/StyleVars"
import CookieBanner from "./components/CookieBanner"

export interface MainViewProps {
    content: React.ReactNode
}

const MainView = (props: MainViewProps) => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MenuBar />
            <Container sx={{ padding: spacingNormal, whiteSpace: "pre-wrap"}} >
                {props.content}
            </Container>
            <CookieBanner />
        </ThemeProvider>
    )
}

export default MainView;