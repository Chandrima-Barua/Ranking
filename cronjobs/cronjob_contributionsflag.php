<?php
include "../core/db/connection.php";
include "../core/functions/sitefunctions.php";
include_once "../core/functions/contributionfunctions.php";

function contributionsflag_cronjob($contribution_type, $flagtype)
{
    $connection = Db_connect::getInstance()->getConnection();
    $queue_type = $flagtype;
    $flag_pointer = $queue_type . '_pointer';
    $main_type = $contribution_type;
    $unique_pointer = $queue_type . '_pointer';
    $queue_table = '';
    $index_table1 = $queue_type . '_index1';
    $index_table2 = $queue_type . '_index2';
    $main_table1 = $main_type . '_index1';
    $main_table2 = $main_type . '_index2';
    $main_table1_pointer = $main_type . '_pointer';     //contributions_pointer
    $queue_table_selected_pointer = $main_table1_pointer;
    $main_table_stored_pointer1 = 'total_abusive'; //where value store
    $main_table_stored_pointer2 = 'total_spam'; //where value store
    $main_table_stored_pointer3 = 'total_iip'; //where value store
    echo $main_table1_pointer;
    echo '<br>';
    echo $flag_pointer;
    echo '<br>';
    echo $main_table1;
    echo '<br>';
    $field_list = " `$main_table1_pointer`, `lists_pointer`, `users_pointer`, `flaguser_pointer`,`abusive`,`spam`,`iip`,`ip_pointer`,`time`,`time_offset`,`$flag_pointer`";
    $cron_pointer_status = get_cronjob_pointer_status($queue_type); // $cron_pointer_status[0]=pointer, $cron_pointer_status[1]=cronstatus, $cron_pointer_status[2]=last_pointer, $cron_pointer_status[3]= last_pointer_queue1, $cron_pointer_status[4]=last_pointer_queue2

    $selected_table = get_selection_only_index_tables_with_cronstatus($queue_type, $cron_pointer_status[1]);
    if ($cron_pointer_status !== false && ($cron_pointer_status[1] == 1 || $cron_pointer_status[1] == 4)) {  //get cronjob status (1/4) send to team cronerror->tablename,cronstatus,time,errortype(string)
        echo $cron_pointer_status[1];
        $queue_table = $cron_pointer_status[1] == 1 ? $queue_type . '_queue1' : $queue_type . '_queue2';
        $cronjob_column_name = $cron_pointer_status[1] == 1 ? 'last_pointer_queue1' : 'last_pointer_queue2';
        //update cronstatus
        $st_get_last_id = $connection->prepare("SELECT MAX(`id`) FROM  `$queue_table`");
        $cron_pointer_status[1]++;
        $st_set_cron_2_5 = $connection->prepare("UPDATE `cronjobstatus` SET `cronstatus` = $cron_pointer_status[1] WHERE `pointer` = $cron_pointer_status[0]");
        $cron_pointer_status[1]++;
        $st_set_cron_3_6 = $connection->prepare("UPDATE `cronjobstatus` SET `cronstatus` = $cron_pointer_status[1] WHERE `pointer` = $cron_pointer_status[0]");
        $cron_pointer_status[1] = $cron_pointer_status[1] == 6 ? 1 : 4;
        $st_set_cron_4_1 = $connection->prepare("UPDATE `cronjobstatus` SET `cronstatus` = $cron_pointer_status[1] WHERE `pointer` = $cron_pointer_status[0]");

        //update total value into main table(comments table)
        $st_total_value_to_main1 = $connection->prepare("UPDATE `$main_table1`
                INNER JOIN (     
        SELECT `$queue_table_selected_pointer`,COALESCE (SUM(`abusive`),0) AS `total_abusive`,COALESCE (SUM(`spam`),0) AS `total_spam`, COALESCE (SUM(`iip`),0) AS `total_iip` FROM $queue_table WHERE `$unique_pointer` IN (SELECT MAX(`$unique_pointer`) FROM $queue_table GROUP BY `$queue_table_selected_pointer`,`flaguser_pointer`) GROUP BY `$queue_table_selected_pointer`
                ) AS 
                temp 
                ON
                `$main_table1`.`$main_table1_pointer` = temp.`$queue_table_selected_pointer`
                SET
                `$main_table1`.`$main_table_stored_pointer1` = `$main_table1`.`$main_table_stored_pointer1`+ temp.`total_abusive`,
                `$main_table1`.`$main_table_stored_pointer2` = `$main_table1`.`$main_table_stored_pointer2`+ temp.`total_spam`,
                `$main_table1`.`$main_table_stored_pointer3` = `$main_table1`.`$main_table_stored_pointer3`+ temp.`total_iip`");

        echo "first query for " . $main_table1;
        echo "UPDATE `$main_table1`
                INNER JOIN (     
        SELECT `$queue_table_selected_pointer`,COALESCE (SUM(`abusive`),0) AS `total_abusive`,COALESCE (SUM(`spam`),0) AS `total_spam`, COALESCE (SUM(`iip`),0) AS `total_iip` FROM $queue_table WHERE `$unique_pointer` IN (SELECT MAX(`$unique_pointer`) FROM $queue_table GROUP BY `$queue_table_selected_pointer`,`flaguser_pointer`) GROUP BY `$queue_table_selected_pointer`
                ) AS 
                temp 
                ON
                `$main_table1`.`$main_table1_pointer` = temp.`$queue_table_selected_pointer`
                SET
                `$main_table1`.`$main_table_stored_pointer1` = `$main_table1`.`$main_table_stored_pointer1`+ temp.`total_abusive`,
                `$main_table1`.`$main_table_stored_pointer2` = `$main_table1`.`$main_table_stored_pointer2`+ temp.`total_spam`,
                `$main_table1`.`$main_table_stored_pointer3` = `$main_table1`.`$main_table_stored_pointer3`+ temp.`total_iip`";
        echo "<br>";
        $st_total_value_to_main2 = $connection->prepare("UPDATE `$main_table2`
                INNER JOIN (     
        SELECT `$queue_table_selected_pointer`,COALESCE (SUM(`abusive`),0) AS `total_abusive`,COALESCE (SUM(`spam`),0) AS `total_spam`, COALESCE (SUM(`iip`),0) AS `total_iip` FROM $queue_table WHERE `$unique_pointer` IN (SELECT MAX(`$unique_pointer`) FROM $queue_table GROUP BY `$queue_table_selected_pointer`,`flaguser_pointer`) GROUP BY `$queue_table_selected_pointer`
                ) AS 
                temp 
                ON
                `$main_table2`.`$main_table1_pointer` = temp.`$queue_table_selected_pointer`
                SET
                 `$main_table2`.`$main_table_stored_pointer1` = `$main_table2`.`$main_table_stored_pointer1`+ temp.`total_abusive`,
                `$main_table2`.`$main_table_stored_pointer2` = `$main_table2`.`$main_table_stored_pointer2`+ temp.`total_spam`,
                `$main_table2`.`$main_table_stored_pointer3` = `$main_table2`.`$main_table_stored_pointer3`+ temp.`total_iip`");

        echo "second query for " . $main_table2;
        echo "UPDATE `$main_table2`
                INNER JOIN (     
        SELECT `$queue_table_selected_pointer`,COALESCE (SUM(`abusive`),0) AS `total_abusive`,COALESCE (SUM(`spam`),0) AS `total_spam`, COALESCE (SUM(`iip`),0) AS `total_iip` FROM $queue_table WHERE `$unique_pointer` IN (SELECT MAX(`$unique_pointer`) FROM $queue_table GROUP BY `$queue_table_selected_pointer`,`flaguser_pointer`) GROUP BY `$queue_table_selected_pointer`
                ) AS 
                temp 
                ON
                `$main_table2`.`$main_table1_pointer` = temp.`$queue_table_selected_pointer`
                SET
                 `$main_table2`.`$main_table_stored_pointer1` = `$main_table2`.`$main_table_stored_pointer1`+ temp.`total_abusive`,
                `$main_table2`.`$main_table_stored_pointer2` = `$main_table2`.`$main_table_stored_pointer2`+ temp.`total_spam`,
                `$main_table2`.`$main_table_stored_pointer3` = `$main_table2`.`$main_table_stored_pointer3`+ temp.`total_iip`";

        echo '<br>';
        //insert from queue table
        $st_load_queue_to_index1 = $connection->prepare("INSERT INTO `$index_table1` ($field_list) SELECT $field_list FROM `$queue_table` ");
        $st_load_queue_to_index2 = $connection->prepare("INSERT INTO `$index_table2`  ($field_list) SELECT $field_list FROM `$queue_table`");
        echo "INSERT INTO `$index_table1` ($field_list) SELECT $field_list FROM `$queue_table` ";
        echo '<br>';
        echo "INSERT INTO `$index_table2`  ($field_list) SELECT $field_list FROM `$queue_table`";
        echo '<br>';
        //already inserted last pointer into cronjobstatus table
        $st_last_queue_pointer_update_into_cronjobstatus_table = $connection->prepare("UPDATE `cronjobstatus` SET `$cronjob_column_name` = (SELECT MAX($unique_pointer) FROM `$queue_table`) WHERE `type` = '$queue_type'");
        echo "for last pointer";
        echo "UPDATE `cronjobstatus` SET `$cronjob_column_name` = (SELECT MAX($unique_pointer) FROM `$queue_table`) WHERE `type` = '$queue_type'";
        //truncate queue & update table
        $st_truncate_queue = $connection->prepare("TRUNCATE `$queue_table`");
echo 'for trancating table';
echo "TRUNCATE `$queue_table`";
        if ($st_get_last_id !== false) {
            execute_statement($st_set_cron_2_5);                    //set cronjob status (2/5)
            sleep(4);
            $prev_last_id = false;
            for ($i = 0; $i < 30; $i++) {
                // get last temp(1/2) id ->sleep 1 ,do this while last id changes (for 30 loop) cronerror->tablename,cronstatus,time,errortype(0)
                sleep(1);
                $last_id = get_last_id_from_queue($st_get_last_id);
                if ($prev_last_id === $last_id) {
                    break;
                } else {
                    $prev_last_id = $last_id;
                }
            }
            if ($i < 30) {
                execute_statements(array(
                    $st_total_value_to_main2,
                    $st_load_queue_to_index2,
                    $st_set_cron_3_6,                                       //set  cronjob status (3/6)
                    $st_total_value_to_main1,
                    $st_load_queue_to_index1,
                    $st_last_queue_pointer_update_into_cronjobstatus_table,
                    $st_truncate_queue,                                     // truncate temp(1/2)
                    $st_set_cron_4_1,                                        //set  cronjob status (4/1)
                ));
                echo 'completed';
            } else {
                $errortype = "30 times looped";
                // send to cron error
            }
        } else {
            $errortype = "last id statement error";
            // send to cron error
        }
    } else {
        echo "this is me";
        print_r($selected_table);
        $last_stored_pointer = get_last_stored_pointer_into_index($connection, $unique_pointer, $selected_table);
       print_r($last_stored_pointer);
        $cron_table_last_indexed_pointer = $queue_table == $queue_type . '_queue1' ? $cron_pointer_status[3] : $cron_pointer_status[4];
        $check_start_queue_type_pointer = $last_stored_pointer - $cron_table_last_indexed_pointer;  //cronjob start pointer
        if ($check_start_queue_type_pointer != 0) {
            if ($cron_pointer_status !== false && ($cron_pointer_status[1] == 2 || $cron_pointer_status[1] == 5)) {  //get cronjob status (2/5) send to team cronerror->tablename,cronstatus,time,errortype(string)

                $queue_table = $cron_pointer_status[1] == 2 ? $queue_type . '_queue1' : $queue_type . '_queue2';
                $cronjob_column_name = $cron_pointer_status[1] == 2 ? 'last_pointer_queue1' : 'last_pointer_queue2';

                //update total value into main table(discussions table)
                $st_total_value_to_main1 = $connection->prepare("UPDATE `$main_table1`
                INNER JOIN (     
        SELECT `$queue_table_selected_pointer`,COALESCE (SUM(`abusive`),0) AS `total_abusive`,COALESCE (SUM(`spam`),0) AS `total_spam`, COALESCE (SUM(`iip`),0) AS `total_iip` FROM $queue_table WHERE `$unique_pointer` IN (SELECT MAX(`$unique_pointer`) FROM $queue_table GROUP BY `$queue_table_selected_pointer`,`flaguser_pointer`) GROUP BY `$queue_table_selected_pointer`
                ) AS 
                temp 
                ON
                `$main_table1`.`$main_table1_pointer` = temp.`$queue_table_selected_pointer`
                SET
                `$main_table1`.`$main_table_stored_pointer1` = `$main_table1`.`$main_table_stored_pointer1`+ temp.`total_abusive`,
                `$main_table1`.`$main_table_stored_pointer2` = `$main_table1`.`$main_table_stored_pointer2`+ temp.`total_spam`,
                `$main_table1`.`$main_table_stored_pointer3` = `$main_table1`.`$main_table_stored_pointer3`+ temp.`total_iip`");


                $st_total_value_to_main2 = $connection->prepare("UPDATE `$main_table2`
                INNER JOIN (     
        SELECT `$queue_table_selected_pointer`,COALESCE (SUM(`abusive`),0) AS `total_abusive`,COALESCE (SUM(`spam`),0) AS `total_spam`, COALESCE (SUM(`iip`),0) AS `total_iip` FROM $queue_table WHERE `$unique_pointer` IN (SELECT MAX(`$unique_pointer`) FROM $queue_table GROUP BY `$queue_table_selected_pointer`,`flaguser_pointer`) GROUP BY `$queue_table_selected_pointer`
                ) AS 
                temp 
                ON
                `$main_table2`.`$main_table1_pointer` = temp.`$queue_table_selected_pointer`
                SET
                 `$main_table2`.`$main_table_stored_pointer1` = `$main_table2`.`$main_table_stored_pointer1`+ temp.`total_abusive`,
                `$main_table2`.`$main_table_stored_pointer2` = `$main_table2`.`$main_table_stored_pointer2`+ temp.`total_spam`,
                `$main_table2`.`$main_table_stored_pointer3` = `$main_table2`.`$main_table_stored_pointer3`+ temp.`total_iip`");
                echo "UPDATE `$main_table2`
                INNER JOIN (     
        SELECT `$queue_table_selected_pointer`,COALESCE (SUM(`abusive`),0) AS `total_abusive`,COALESCE (SUM(`spam`),0) AS `total_spam`, COALESCE (SUM(`iip`),0) AS `total_iip` FROM $queue_table WHERE `$unique_pointer` IN (SELECT MAX(`$unique_pointer`) FROM $queue_table GROUP BY `$queue_table_selected_pointer`,`flaguser_pointer`) GROUP BY `$queue_table_selected_pointer`
                ) AS 
                temp 
                ON
                `$main_table2`.`$main_table1_pointer` = temp.`$queue_table_selected_pointer`
                SET
                 `$main_table2`.`$main_table_stored_pointer1` = `$main_table2`.`$main_table_stored_pointer1`+ temp.`total_abusive`,
                `$main_table2`.`$main_table_stored_pointer2` = `$main_table2`.`$main_table_stored_pointer2`+ temp.`total_spam`,
                `$main_table2`.`$main_table_stored_pointer3` = `$main_table2`.`$main_table_stored_pointer3`+ temp.`total_iip`";
                //update cronstatus
                $st_set_cron_3_6 = $connection->prepare("UPDATE `cronjobstatus` SET `cronstatus` = $cron_pointer_status[1] WHERE `pointer` = $cron_pointer_status[0]");
                $cron_pointer_status[1] = $cron_pointer_status[1] == 6 ? 1 : 4;
                $st_set_cron_4_1 = $connection->prepare("UPDATE `cronjobstatus` SET `cronstatus` = $cron_pointer_status[1] WHERE `pointer` = $cron_pointer_status[0]");

                //insert from queue table
                $st_load_queue_to_index1 = $connection->prepare("INSERT INTO `$index_table1` ($field_list) SELECT $field_list FROM `$queue_table` ");
                $st_load_queue_to_index2 = $connection->prepare("INSERT INTO `$index_table2`  ($field_list) SELECT $field_list FROM `$queue_table`WHERE `$unique_pointer`> $check_start_queue_type_pointer");

                //already inserted last pointer into cronjobstatus table
                $st_last_queue_pointer_update_into_cronjobstatus_table = $connection->prepare("UPDATE `cronjobstatus` SET `$cronjob_column_name` = (SELECT MAX($unique_pointer) FROM `$queue_table`) WHERE `type` = '$queue_type'");

                //truncate queue & update table
                $st_truncate_queue = $connection->prepare("TRUNCATE `$queue_table`");

                execute_statements(array(
                    $st_total_value_to_main2,
                    $st_load_queue_to_index2,
                    $st_set_cron_3_6,                                       //set  cronjob status (3/6)
                    $st_total_value_to_main1,
                    $st_load_queue_to_index1,
                    $st_last_queue_pointer_update_into_cronjobstatus_table,
                    $st_truncate_queue,                                     // truncate temp(1/2)
                    $st_set_cron_4_1,                                        //set  cronjob status (4/1)
                ));
                echo 'completed';

            } elseif ($cron_pointer_status !== false && ($cron_pointer_status[1] == 3 || $cron_pointer_status[1] == 6)) {   //get cronjob status (3/6) send to team cronerror->tablename,cronstatus,time,errortype(string)

                $queue_table = $cron_pointer_status[1] == 3 ? $queue_type . '_queue1' : $queue_type . '_queue2';
                $cronjob_column_name = $cron_pointer_status[1] == 3 ? 'last_pointer_queue1' : 'last_pointer_queue2';

                //update total value into main table(discussions table)
                $st_total_value_to_main1 = $connection->prepare("UPDATE `$main_table1`
                INNER JOIN (     
        SELECT `$queue_table_selected_pointer`,COALESCE (SUM(`abusive`),0) AS `total_abusive`,COALESCE (SUM(`spam`),0) AS `total_spam`, COALESCE (SUM(`iip`),0) AS `total_iip` FROM $queue_table WHERE `$unique_pointer` IN (SELECT MAX(`$unique_pointer`) FROM $queue_table GROUP BY `$queue_table_selected_pointer`,`flaguser_pointer`) GROUP BY `$queue_table_selected_pointer`
                ) AS 
                temp 
                ON
                `$main_table1`.`$main_table1_pointer` = temp.`$queue_table_selected_pointer`
                SET
                 `$main_table1`.`$main_table_stored_pointer1` = `$main_table1`.`$main_table_stored_pointer1`+ temp.`total_abusive`,
                `$main_table1`.`$main_table_stored_pointer2` = `$main_table1`.`$main_table_stored_pointer2`+ temp.`total_spam`,
                `$main_table1`.`$main_table_stored_pointer3` = `$main_table1`.`$main_table_stored_pointer3`+ temp.`total_iip`");

                //update cronstatus
                $cron_pointer_status[1] = $cron_pointer_status[1] == 6 ? 1 : 4;
                $st_set_cron_4_1 = $connection->prepare("UPDATE `cronjobstatus` SET `cronstatus` = $cron_pointer_status[1] WHERE `pointer` = $cron_pointer_status[0]");

                //insert from queue table
                $st_load_queue_to_index1 = $connection->prepare("INSERT INTO `$index_table1` ($field_list) SELECT $field_list FROM `$queue_table` WHERE `$unique_pointer`> $check_start_queue_type_pointer");

                //already inserted last pointer into cronjobstatus table
                $st_last_queue_pointer_update_into_cronjobstatus_table = $connection->prepare("UPDATE `cronjobstatus` SET `$cronjob_column_name` = (SELECT MAX($unique_pointer) FROM `$queue_table`) WHERE `type` = '$queue_type'");

                //truncate queue & update table
                $st_truncate_queue = $connection->prepare("TRUNCATE `$queue_table`");

                execute_statements(array(
                    $st_total_value_to_main1,
                    $st_load_queue_to_index1,
                    $st_last_queue_pointer_update_into_cronjobstatus_table,
                    $st_truncate_queue,                                     // truncate temp(1/2)
                    $st_set_cron_4_1,                                        //set  cronjob status (4/1)
                ));
                echo 'second if';
            } else {
                $errortype = $cron_pointer_status == false ? "false status" : "wrong status";
                // send to cron error
            }
        } else {
            $errortype = "Already index";
        }
    }


}

//var_dump(contributionsflag_cronjob('contributions', 'contributionflag'));
//var_dump(contributionsflag_cronjob('multimedia_contributions', 'multimedia_contributionflag'));
