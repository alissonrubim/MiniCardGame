import { ReactElement } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styleSizes = {
  label_top_left: {
    top: 5,
    left: 10,
    fontSize: 20,
  },
  icon_top_left: {
    top: 30,
    left: 9,
    fontSize: 16,
  },
  label_bottom_right: {
    bottom: 5,
    right: 10,
    fontSize: 20,
  },
  icon_bottom_right: {
    bottom: 30,
    right: 9,
    fontSize: 16,
  },
  icon_center: {
    fontSize: 40,
    top: 45
  },
  icon_center_container: {
    width: 90,
    height: 140,
    left: 28,
    top: 28,
    borderWidth: 1
  }
}

const useStyles = makeStyles({
  root: {
    background: 'white',
    height: '100%',
    width: '100%',
  },
  label_top_left: {
    position: 'absolute',
    fontWeight: 'bold',
  },
  icon_top_left: {
    position: 'absolute',
    fontWeight: 'bold',
  },
  label_bottom_right: {
    transform: 'scaleY(-1)',
    position: 'absolute',
    fontWeight: 'bold',
  },
  icon_bottom_right: {
    transform: 'scaleY(-1)',
    position: 'absolute',
    fontWeight: 'bold',
  },
  suit_logo_container: {
    position: 'relative',
    border: '1px solid #ccc',
  },
  icon_center: {
    position: 'relative',
  }
});

export default function CardFront(props: CardFrontProps){
  const classes = useStyles();

  let icon = props.renderIcon();

  let label_top_left_style = {
    top: styleSizes.label_top_left.top*props.scale,
    left: styleSizes.label_top_left.left*props.scale,
    fontSize: styleSizes.label_top_left.fontSize*props.scale,
  };

  let icon_top_left_style = {
    top: styleSizes.icon_top_left.top*props.scale,
    left: styleSizes.icon_top_left.left*props.scale,
    fontSize: styleSizes.icon_top_left.fontSize*props.scale,
  }

  let icon_bottom_right_style = {
    bottom: styleSizes.icon_bottom_right.bottom*props.scale,
    right: styleSizes.icon_bottom_right.right*props.scale,
    fontSize: styleSizes.icon_bottom_right.fontSize*props.scale,
  }

  let label_bottom_right_style = {
    bottom: styleSizes.label_bottom_right.bottom*props.scale,
    right: styleSizes.label_bottom_right.right*props.scale,
    fontSize: styleSizes.label_bottom_right.fontSize*props.scale,
  }

  let icon_center_container_style = {
    width: styleSizes.icon_center_container.width*props.scale,
    height: styleSizes.icon_center_container.height*props.scale,
    left: styleSizes.icon_center_container.left*props.scale,
    top: styleSizes.icon_center_container.top*props.scale,
    borderWidth: styleSizes.icon_center_container.borderWidth*props.scale,
  }

  let icon_center_style = {
    fontSize: styleSizes.icon_center.fontSize*props.scale,
    top: styleSizes.icon_center.top*props.scale,
  }

  return (
    <Box className={classes.root} style={{color: props.color}}>
      <div className={classes.label_top_left} style={label_top_left_style}>{props.label}</div>
      <div className={classes.icon_top_left} style={icon_top_left_style}>{icon}</div>
      <div className={classes.suit_logo_container} style={icon_center_container_style}>
        <div className={classes.icon_center} style={icon_center_style}>{icon}</div>
      </div>
      <div className={classes.icon_bottom_right} style={icon_bottom_right_style}>{icon}</div>
      <div className={classes.label_bottom_right} style={label_bottom_right_style}>{props.label}</div>
    </Box>
  )
}

export interface CardFrontProps {
  scale: number,
  label: string,
  color: string,
  renderIcon: () => ReactElement
}