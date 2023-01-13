import { MatchStateObject } from "./MatchStateObject";

export interface StateProps {
    matchStateObject: MatchStateObject;
    onUpdate: (matchStateObject: MatchStateObject) => void;
    setValidate: (onValidate: ((matchStateObject: MatchStateObject) => boolean)) => void
    onNext: () => void;
}