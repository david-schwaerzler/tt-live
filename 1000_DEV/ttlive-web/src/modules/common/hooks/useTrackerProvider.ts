import { useMatomo } from "@jonkoops/matomo-tracker-react"
import { useEffect } from "react";

interface CustomDimension {
    id: number
    value: string
  }
  

export const useTrackPage = (page : string, href: string, matchId?: number) => {
    const {trackPageView} = useMatomo();
    useEffect(() => {
        if(matchId === -1)
            return;
        let customDimension : Array<CustomDimension> | null = null;
        if(matchId != null){
            customDimension = [{id: 1, value: matchId.toString()}]
        }

        trackPageView({href: href, documentTitle:  page, customDimensions: customDimension})
    }, [page, href, matchId, trackPageView]);
}