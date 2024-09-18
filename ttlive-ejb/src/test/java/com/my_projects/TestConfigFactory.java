package com.my_projects;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.flywaydb.core.Flyway;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.asset.StringAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;

public class TestConfigFactory {

	private final Path persistencePath = Paths.get("src", "test", "resources", "test-persistence.xml");
	private final Path migrationPath = Paths.get("src", "test", "resources", "test-db");	
	
	private static TestConfigFactory instance;


	public static TestConfigFactory getInstance() {
		if (instance == null) {
			instance = new TestConfigFactory();
		}
		return instance;
	}

	public WebArchive createDefaultArchive(String name) throws IOException {		
		StringAsset persistence = createDefaultPersistence();
		return ShrinkWrap.create(WebArchive.class, name +".war") //
				.addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml")
				.addAsResource(persistence, "META-INF/persistence.xml");		
	}

	public Flyway createDefaultMigration() {
		return Flyway.configure().dataSource("jdbc:postgresql://localhost:5432/stock_analyze", "stock_analyze", "stock_analyze") //
				.initSql("SET search_path=stock_analyze_test") //
				.locations("filesystem:" + migrationPath.toString()) //
				.schemas("stock_analyze_test")
				.load();
				
	}

	public StringAsset createDefaultPersistence() throws IOException {
		String persistence = new String(Files.readAllBytes(persistencePath));
		return new StringAsset(persistence);
	}


	
}
