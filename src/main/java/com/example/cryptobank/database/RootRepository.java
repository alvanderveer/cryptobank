package com.example.cryptobank.database;

import com.example.cryptobank.domain.Admin;
import com.example.cryptobank.domain.Asset;
import com.example.cryptobank.domain.Purchase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class RootRepository {
    private final Logger logger = LoggerFactory.getLogger(RootRepository.class);
    private AdminDAO adminDAO;
    private CustomerDAO customerDAO;
    private AssetDao assetDao;

    @Autowired
    public RootRepository(AdminDAO adminDAO, AssetDao assetDao, CustomerDAO customerDAO) {
        logger.info("New RootRepository");
        this.adminDAO = adminDAO;
        this.assetDao = assetDao;
        this.customerDAO = customerDAO;
    }

    public Admin getAdminByUsername(String username) {
        Admin admin = adminDAO.findByUsername(username);
        return admin;
    }

    public Admin save(Admin admin) {
        return adminDAO.save(admin);
    }

    public Asset save(Asset asset) {
        return assetDao.save(asset);
    }

    public Asset getByAbbreviation(String abbreviation) {
        Asset asset = assetDao.findByAbbreviation(abbreviation);
        return asset;
    }

    public Asset getByName(String name) {
        Asset asset = assetDao.findByName(name);
        return asset;
    }

    public ArrayList<Asset> getAll() {
        ArrayList allAssets = assetDao.getAll();
        return allAssets;
    }

} // end of class RootRepository