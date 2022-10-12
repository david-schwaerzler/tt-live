package com.ttlive.utils;

import java.util.List;

public interface Dao<Entity> {
	public Entity findById(long id);
	public List<Entity> findAll();
	public void merge(Entity entity);
	public void persist(Entity entity);
	public void remove(Entity entity);
	
	public void flush();
}
