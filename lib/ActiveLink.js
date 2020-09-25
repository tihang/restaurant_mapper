import { useRouter } from "next/router";
import styled from "@emotion/styled";

function ActiveLink({ children, href }) {
  const router = useRouter();

  const StyledAnchor = styled.a`
    margin-right: 30px;
    font-weight: 600;
    color: ${router.pathname === href ? "#805AD5" : "black"};
    &:hover {
      color: #805ad5;
    }
  `;

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <StyledAnchor href={href} onClick={handleClick}>
      {children}
    </StyledAnchor>
  );
}

export default ActiveLink;
