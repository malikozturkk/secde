"use client";

import React, { memo } from "react";
import {
  COORDINATE_PRECISION,
  TEXTS,
} from "@/src/constants/worship";
import { formatCoordinate } from "@/src/lib/worship-utils";
import type { WorshipMeta } from "@/src/types/worship.types";
import { GlobeIcon } from "../icons/ControlIcons";

interface LocationCardProps {
  meta: WorshipMeta;
  locationName: string;
}

const LocationCardComponent: React.FC<LocationCardProps> = ({
  meta,
  locationName,
}) => {
  return (
    <div className="wsh-rail-card">
      <div className="wsh-rail-head">
        <h3 className="wsh-rail-title">{TEXTS.locationTitle}</h3>
        <span className="wsh-rail-tag">{locationName}</span>
      </div>
      <div className="wsh-loc-row">
        <div className="wsh-loc-cell">
          <span className="wsh-loc-key">{TEXTS.latitudeLabel}</span>
          <span className="wsh-loc-val">
            {formatCoordinate(meta.latitude, COORDINATE_PRECISION)}
          </span>
        </div>
        <div className="wsh-loc-cell">
          <span className="wsh-loc-key">{TEXTS.longitudeLabel}</span>
          <span className="wsh-loc-val">
            {formatCoordinate(meta.longitude, COORDINATE_PRECISION)}
          </span>
        </div>
      </div>
      <div className="wsh-loc-zone">
        <GlobeIcon width={14} height={14} />
        {meta.timezone}
      </div>
    </div>
  );
};

export const LocationCard = memo(LocationCardComponent);
