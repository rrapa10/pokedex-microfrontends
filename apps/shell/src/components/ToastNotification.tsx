import { useEffect, useState } from "react";

const ToastNotification = ({ lastViewed }:any) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (lastViewed) {
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    }
  }, [lastViewed]);

  return visible ? <div className="toast">Último Pokémon: {lastViewed.name}</div> : null;
};

export default ToastNotification;
