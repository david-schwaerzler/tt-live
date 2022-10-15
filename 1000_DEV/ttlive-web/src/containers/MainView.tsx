import { Container, CssBaseline, ThemeProvider } from "@mui/material"
import MenuBar from "./MenuBar"
import theme from "./CustomTheme"
import { spacingNormal } from "../components/utils/StyleVars"

export interface MainViewProps {
    content: React.ReactNode
}

const MainView = (props: MainViewProps) => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MenuBar />
            <Container sx={{ padding: spacingNormal, whiteSpace: "pre-wrap" }}>
                {props.content}
            </Container>
        </ThemeProvider>
    )
}

export default MainView;