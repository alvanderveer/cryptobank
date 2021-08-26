package com.example.cryptobank.domain;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Portfolio {
    private final Logger logger = LoggerFactory.getLogger(Portfolio.class);
    private Map<Asset, Double> assetMap;

    public Portfolio() {
        this.assetMap = new HashMap<>();
        logger.info("New Portfolio");
    }

    // TODO tijdelijke default constructor
    public Portfolio() {

    }

    public Map<Asset, Double> getAssetMap() {
        return assetMap;
    }

    public void setAssetMap(Map<Asset, Double> assetMap) {
        this.assetMap = assetMap;
    }

}
