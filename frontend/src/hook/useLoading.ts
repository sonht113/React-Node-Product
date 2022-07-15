import { OverlayLoadingContext } from './../context/LoadingContext';
import React, { useContext } from 'react';

export default function useLoading() {
  const { setLoading } = useContext(OverlayLoadingContext);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return [showLoading, hideLoading];
}