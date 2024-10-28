import { useMemo, useState } from "react";
import { searchAllRepertorios } from "../services/actuaciones";

export function useActuaciones() {
	const [actuaciones, setActuaciones] = useState([]);
  const [actuacionEnDirecto, setActuacionEnDirecto] = useState([])
	const [loading, setLoading] = useState(true);

	const getActuaciones = useMemo(() => {
		return async () => {
			try {
				setLoading(true);
				const newActuaciones = await searchAllRepertorios();
        const liveActuacion = newActuaciones.filter((actuacion) => actuacion.isLive)
				setActuaciones(newActuaciones);
        setActuacionEnDirecto(liveActuacion)
			} catch (error) {
        console.error(error)
        setLoading(false)
			} finally {
        setLoading(false)
      }
		};
	}, [actuaciones]);

  return {actuaciones, actuacionEnDirecto, getActuaciones, loading}
}
