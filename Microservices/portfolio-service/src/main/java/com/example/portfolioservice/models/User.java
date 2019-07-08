package com.example.portfolioservice.models;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.mongo.Mongo;
import org.immutables.value.Value;

import java.util.List;


@SuppressWarnings("ALL")
@Value.Immutable
@Mongo.Repository(collection = "UserParser")
@JsonSerialize(as = ImmutableUser.class)
@JsonDeserialize(as = ImmutableUser.class)
public interface User  {
    @Mongo.Id
    String userId();
    float currBal();
    String baseCurr();
    List<Fund> all_funds();
}
