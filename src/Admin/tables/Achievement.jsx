// ** MUI Imports
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import {
  ThemeProvider,
  createTheme,
  styled,
  useTheme,
} from "@mui/material/styles";

// Styled component for the triangle shaped background image
const TriangleImg = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});

// Styled component for the trophy image
const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

function Achievement() {
  // const theme = useTheme();

  // const imageSrc =
  //   theme.palette.mode === "light" ? "triangle-light.png" : "triangle-dark.png";
  return (
    <>
      <Card sx={{ position: "relative",bgcolor:"black",color:"white",width:"500px" }}>
        <CardContent>
          <Typography variant="h6" sx={{ letterSpacing: "0.25px" }}>
            Shop With TRENDORA
          </Typography>
          <Typography variant="body2">Congratulations 🥳</Typography>

          <Typography variant="h5" sx={{ my: 3.1, color: "primary.main" }}>
            420.8k
          </Typography>
          <Button size="small" variant="contained">
            View Sales
          </Button>
          {/* <TriangleImg
            alt="triangle background"
            src={`/images/misc/${imageSrc}`}
          /> */}
          <TrophyImg  alt="trophy" src="https://i.pinimg.com/736x/d7/99/a1/d799a1006b2f98a14237101ace6f28f2.jpg" />
        </CardContent>
      </Card>
    </>
  );
}

export default Achievement;
