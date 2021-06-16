import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styleSizes = {
  pattern: {
    top: 9,
    left: 9,
    borderRadius: 5,
    width: 130,
    height: 180,
    backgroundSize: 70,
    borderWidth: 1
  }
}

const useStyles = makeStyles({
  root: {
    background: 'white',
    height: '100%',
    width: '100%',
  },
  pattern: {
    position: 'relative',
    border: '1px solid #545454',
    backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/001/209/780/original/square-pattern-png.png")',
    opacity: 0.2,
  }
});

export default function CardBack(props: CardBackProps){
  const classes = useStyles();

  return (
    <Box className={classes.root} style={{backgroundColor: props.color}}>
      <Box className={classes.pattern} style={{
        top: styleSizes.pattern.top*props.scale,
        left: styleSizes.pattern.left*props.scale,
        borderWidth: styleSizes.pattern.borderWidth*props.scale, 
        borderRadius: styleSizes.pattern.borderRadius*props.scale,
        width: styleSizes.pattern.width*props.scale,
        height: styleSizes.pattern.height*props.scale,
        backgroundSize: `${styleSizes.pattern.backgroundSize*props.scale}px ${styleSizes.pattern.backgroundSize*props.scale}px`,
      }}>
      </Box>
    </Box>
  )
}

export interface CardBackProps {
  scale: number;
  color: string;
}