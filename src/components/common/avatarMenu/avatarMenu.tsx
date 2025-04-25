import React, { JSX } from "react";
import dynamic from "next/dynamic";

import { ActionWrapper, ListAvatar, UserPrefix } from "./avatarMenu.style";

const Typography = dynamic(() => import("@mui/material/Typography"));

interface IProps
  extends Readonly<{
    value: string;
    index: number;
  }> {}

/**
 * @component {AvatarMenu} - Contact Table Name Action
 * @param {IProps} props
 * @return {JSX.Element}
 */
export const AvatarMenu = (props: IProps): JSX.Element => {
  const { value, index } = props;

  return (
    <ActionWrapper key={index}>
      <ListAvatar>
        <UserPrefix>
          {value ? value.trimStart().substring(0, 1).toUpperCase() : "U"}
        </UserPrefix>
      </ListAvatar>
      <Typography variant="body2">{value}</Typography>
    </ActionWrapper>
  );
};

export default React.memo(AvatarMenu);
